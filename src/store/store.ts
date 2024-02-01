import { configureStore } from '@reduxjs/toolkit'
import question from './slices/questionSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    question,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()