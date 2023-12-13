const { GraphQLError } = require('graphql')
const { ApolloServer } = require('@apollo/server')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID! 
  },
  type Author {
    name: String
    born: Int
    id: ID!,
    bookCount: Int
  },
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  },
  type Token{
    value: String!
  },
  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author],
    me: User
  },
  type Mutation {
    addBook(
        title: String!,
        published: Int,
        author: String!,
        genres: [String]
    ) : Book,
    editAuthor(
        name: String!,
        setBornTo: Int!,
    ) : Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ) : User
    login(
      username: String!
      password: String!
    ) : Token
  },
  type Subscription {
    addBook: Book!
  }
  `

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author')
      console.log('args', args)
      if (args.author) {
        result = result.filter((book) => book.author === args.author)
      }
      if (args.genre === 'all') {
        return result
      }
      if (args.genre) {
        result = result.filter((book) => {
          console.log(book)
          return book.genres
            .map((word) => word.toLowerCase())
            .includes(args.genre)
        })
      }

      return result
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const result = await Book.find().populate('author')

      return result.filter((book) => {
        return book.author.name === root.name
      }).length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(args)
      console.log(context)
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      let id = null
      const result = await Author.findOne({ name: args.author })
      if (!result) {
        const author = new Author({ name: args.author })
        const saveAuthor = await author.save().catch((error) => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error,
            },
          })
        })
        id = saveAuthor._id
      } else {
        id = result.id
        console.log(id)
      }

      const book = new Book({ ...args, author: id })
      pubsub.publish('BOOK_ADDED', { addBook: book })
      return await book.save().catch((error) => {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const author = await Author.findOne({ name: args.name })

      if (!author) return null
      const authorToUpdate = new Author({
        _id: author._id,
        name: author.name,
        born: args.setBornTo,
      })
      const result = await Author.findByIdAndUpdate(
        author._id,
        authorToUpdate,
        { new: true }
      )

      return result
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw (
          (new GraphQLError('wrong credentials'),
          {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          })
        )
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    addBook: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
