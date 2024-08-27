import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todoSlice.js'

export const store = configureStore({
    reducer: { 
        todos: todosReducer,
    },
})