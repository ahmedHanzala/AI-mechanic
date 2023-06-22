import { configureStore, createReducer } from '@reduxjs/toolkit'

import RecordReducer from './Slices/RecordSlice'



export default configureStore({
  reducer: {
    record: RecordReducer,
  },
})