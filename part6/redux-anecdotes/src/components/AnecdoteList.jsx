import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const anecdoteList = () => {
    const compareVotes = (a, b) => {
        return -(a.votes - b.votes)
    }
    const anecdotes = useSelector(state => {

        if (state.filter === 'ALL') {
            return [...state.anecdotes].sort(compareVotes)
        }
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)).sort(compareVotes)

    })

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(upvoteAnecdote(id))
        const anecdote = anecdotes.find(n => n.id === id)
        dispatch(setNotification(`You upvoted anecdote '${anecdote.content}'`, 10))
        console.log('vote', id)
    }

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        ))
}

export default anecdoteList