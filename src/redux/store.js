import { configureStore } from '@reduxjs/toolkit'
import usernameReducer from './user/usernameSlice'
import emailReducer from './user/usernameSlice'

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    email: emailReducer,
  },
})