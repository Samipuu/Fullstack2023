import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import { Routes, Route } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries/queries'
import Menu from './components/Menu'
import Recommendations from './components/Recommendations'
import Notification from './components/Notification'

const App = () => {
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      setNotification(
        `Book ${data.data.addBook.title} has been added on the server`
      )
      setTimeout(() => {
        setNotification(null)
      }, 10000)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('library-token')
    setToken(token)
    console.log(token)
    console.log(!token)
  }, [])

  return (
    <div>
      <Menu token={token} setToken={setToken} />
      <Notification notification={notification} />
      <Routes>
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/' element={<Books />} />
        <Route path='/newbook' element={<NewBook />} />
        <Route path='/recommendations' element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
