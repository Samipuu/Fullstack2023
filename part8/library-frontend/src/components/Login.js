import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)
  const navigate = useNavigate()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log(token)
      setToken(token)
      localStorage.setItem('library-token', token)
      navigate('/')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
