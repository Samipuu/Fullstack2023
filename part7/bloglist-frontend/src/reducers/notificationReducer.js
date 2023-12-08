import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action) {
            const notification = action.payload
            return notification
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const setNotification = (message) => {
    return async dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}

export default notificationSlice.reducer
export const { notificationChange, clearNotification } = notificationSlice.actions