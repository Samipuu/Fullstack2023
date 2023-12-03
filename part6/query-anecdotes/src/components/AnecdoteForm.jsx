import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const addNotification = message => {
    dispatch({ type: 'ADD', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const errorHandler = (props) => {
    if (props.content.length < 5) {
      addNotification(`Too short anecdote. Minimum length is 5.`)
    } else {
      addNotification(`Adding new anecdote failed "${error}"`)
    }
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) },

  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content: content, votes: 0 }, {
      onError: (error) => { errorHandler({ content: content, error: error }) }
    })
    console.log(JSON.parse(JSON.stringify(newAnecdoteMutation)))
    event.target.anecdote.value = ''
    console.log('new anecdote')
    addNotification(`Anecdote "${content}" has been added`)

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
