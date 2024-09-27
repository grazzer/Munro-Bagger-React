import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todoSlice'
import baggedListReducer from './features/BaggedList';

export const store = configureStore({
    reducer: { 
        baggedlist: baggedListReducer
    },
})