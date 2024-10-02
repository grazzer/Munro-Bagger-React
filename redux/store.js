import { configureStore } from '@reduxjs/toolkit'
import baggedListReducer from './features/BaggedList';
import munroListReducer from './features/MunroList';

export const store = configureStore({
    reducer: { 
        baggedlist: baggedListReducer,
        munroList: munroListReducer
    },
})