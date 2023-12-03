import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdoteService"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('add', content)
        //const response = await anecdoteService.createNew(content)
        //console.log(response)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You created anecdote '${content}'`, 10))
    }

    return (
        <form onSubmit={add}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )

}

export default AnecdoteForm