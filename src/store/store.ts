import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import taskReducer from './slice/taskSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch