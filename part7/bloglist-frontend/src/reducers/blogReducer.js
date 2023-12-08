import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      const content = action.payload
        console.log(action.payload)
      state.push(
        content
      )
    },
    upvote(state, action) {
      const id = action.payload
      const blog = state.find(n => n.id === id)
      const upvotedBlog = { ...blog, likes: blog.likes + 1 }
      return state.map(blog => blog.id !== id ? blog : upvotedBlog)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action){
        return state.filter(blog => blog.id !== action.payload)
    },
    addCommentState(state, action) {
        console.log(action.payload)
        const id = action.payload.id
        const blog = state.find(n => n.id === id)
        console.log(blog)
        const updatedBlog = {...blog, comments: [...blog.comments, action.payload.comment]}
        return state.map(blog => blog.id !== id ? blog : updatedBlog)
    }
  }
})

export const deleteBlog = (id, user) => {
    return async dispatch => {
        const response = await blogService.remove(id, user)
        dispatch(removeBlog(id))
    }
}

export const upvoteBlog = blog => {
  return async dispatch => {
    const id = blog.id
    console.log(blog)
    console.log(id)
    dispatch(upvote(id))
    const response = await blogService.update({blog: {...blog, likes: blog.likes + 1}})
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  console.log(content)
  return async dispatch => {
    const newBlog = await blogService.addBlog(content)
    dispatch(addBlog({...newBlog, user: content.user}))
  }
}

export const addComment = (id, comment) => {
    console.log(id, comment)
    return async dispatch => {
        const response = await blogService.addComment(id, comment)
        dispatch(addCommentState({id: id, comment: comment}))
    }
}

export default blogSlice.reducer
export const { addBlog, upvote, setBlogs, removeBlog, addCommentState } = blogSlice.actions