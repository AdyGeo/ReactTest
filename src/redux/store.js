import { configureStore } from '@reduxjs/toolkit'
import notesDataSlice from './notesDataSlice'
import tasksDataSlice from './tasksDataSlice'

export const store = configureStore({
    reducer: {
        notesData: notesDataSlice,
        tasksData: tasksDataSlice
    },
})