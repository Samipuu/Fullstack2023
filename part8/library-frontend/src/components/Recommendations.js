import { useQuery } from '@apollo/client'
import { filterBookByGenre, ME } from '../queries/queries'
import { useState, useEffect } from 'react'

const Recommendations = () => {
  const favorite = useQuery(ME)
  let genre = null

  if (!favorite.loading) {
    genre = favorite.data.me.favoriteGenre
  }
  const result = useQuery(filterBookByGenre, {
    variables: { genre },
    skip: favorite.loading,
  })

  if (result.loading || favorite.loading) {
    return <div>loading....</div>
  }

  console.log(result.data)
  console.log(favorite.data)

  const books = result.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              return book.genres
                .map((word) => word.toLowerCase())
                .includes(genre)
            })
            .map((a) => (
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

export default Recommendations
