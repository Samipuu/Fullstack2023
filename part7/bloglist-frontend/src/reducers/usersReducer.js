import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            const users = action.payload
            return users
        },
        removeUser(state,action) {
            return state.filter(user => user !== action.payload)
        }
    }
})

export const initializeUsers = () => {
    return async dispatch => {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    }
  }

export default usersSlice.reducer
export const { setUsers, removeUser } = usersSlice.actions