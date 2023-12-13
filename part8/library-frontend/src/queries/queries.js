import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int
    $author: String!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`
export const filterBookByGenre = gql`
  query ($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    addBook {
      title
      published
      id
      genres
    }
  }
`
