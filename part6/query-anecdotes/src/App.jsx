import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { upvoteAnecdote, getAnecdotes } from './components/requests'
import NotificationContext from './components/NotificationContext'
import { useContext } from 'react'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const upvoteAnecdoteMutation = useMutation({
    mutationFn: upvoteAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) }
  })
  const handleVote = (anecdote) => {
    upvoteAnecdoteMutation.mutate({ id: anecdote.id, anecdote: { ...anecdote, votes: anecdote.votes + 1 } })
    console.log('vote')
    dispatch({ type: 'ADD', payload: `Anecdote "${anecdote.content}" has been upvoted` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const response = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })
  console.log(JSON.parse(JSON.stringify(response)))

  if (response.isLoading) {
    return <div>loading anecdotes please wait.....</div>
  }

  if (response.isError) {
    return <div>Anecdote service is not available due to problems in the server</div>
  }

  const anecdotes = response.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
