import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './reducers/searchSlice'

const store = configureStore({
  reducer: {
    searchReducer:searchSlice
  },
})

export default store