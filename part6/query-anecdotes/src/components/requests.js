import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)


export const createAnecdote = anecdote =>
    axios.post(baseUrl, anecdote).then(res => res.data)

export const upvoteAnecdote = (props) =>
    axios.put(`${baseUrl}/${props.id}`, props.anecdote).then(res => res.data)