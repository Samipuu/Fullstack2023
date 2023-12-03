import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(
        content
      )
    },
    upvote(state, action) {
      const id = action.payload
      const anecdote = state.find(n => n.id === id)
      const upvotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : upvotedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const upvoteAnecdote = id => {
  return async dispatch => {
    const response = await anecdoteService.upvote(id)
    dispatch(upvote(id))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  console.log(content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
export const { addAnecdote, upvote, setAnecdotes } = anecdoteSlice.actions