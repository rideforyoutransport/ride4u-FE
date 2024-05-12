import { configureStore } from '@reduxjs/toolkit'
import userStateReducer from '../slice/userStateSlice'

export default configureStore({
  reducer: {
    counter: userStateReducer,
  },
})

