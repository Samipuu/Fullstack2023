import { Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const Menu = ({ token, setToken }) => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  if (token === null) {
    return (
      <div>
        <button>
          <Link to='/authors'>authors</Link>
        </button>
        <button>
          <Link to='/'>books</Link>
        </button>

        <button>
          <Link to='/login'>Login</Link>
        </button>
      </div>
    )
  }
  return (
    <div>
      <button>
        <Link to='/authors'>authors</Link>
      </button>
      <button>
        <Link to='/'>books</Link>
      </button>
      <button>
        <Link to='/newbook'>add book</Link>
      </button>
      <button>
        <Link to='/recommendations'>Recommendations</Link>
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Menu
