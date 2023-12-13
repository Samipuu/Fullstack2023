import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, filterBookByGenre, BOOK_ADDED } from '../queries/queries'
import { useState } from 'react'

const Books = () => {
  const all = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')
  const result = useQuery(filterBookByGenre, {
    variables: { genre },
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      result.refetch()
    },
  })

  if (result.loading || all.loading) {
    return <div>loading....</div>
  }
  console.log(result.data)
  const books = result.data.allBooks
  const genres = all.data.allBooks
    .map((book) => book.genres)
    .flat(1)
    .map((genre) => genre.toLowerCase())
    .filter((genre, index, array) => array.indexOf(genre) === index)

  return (
    <div>
      <h2>books</h2>
      Filter:{''}
      <select
        value={genre}
        onChange={({ target }) => {
          setGenre(target.value)
        }}
      >
        {genres.map((a) => (
          <option value={a}>{a}</option>
        ))}
        <option value='all'>all genres</option>
      </select>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
