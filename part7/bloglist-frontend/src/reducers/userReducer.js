import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const user = action.payload
            return user
        },
        removeUser(state, action) {
            return null
        },
    }
})

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({username, password})
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        dispatch(setUser(user))
    }
}

export const out = () => {
    return dispatch => {
        dispatch(removeUser())
    }
}

export default userSlice.reducer
export const { setUser, removeUser } = userSlice.actions