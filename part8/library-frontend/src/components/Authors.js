import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/queries'
import { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const result = useQuery(ALL_AUTHORS)
  console.log(result)

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const updateBirthYear = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo } })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      Name:
      <form onSubmit={updateBirthYear}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => (
            <option value={a.name}>{a.name}</option>
          ))}
        </select>
        <br />
        Birthyear:
        <input
          type='number'
          value={setBornTo}
          onChange={({ target }) => setBorn(target.valueAsNumber)}
        />
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors
