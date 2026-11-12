import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskOccurrence } from "../../types";

interface TaskState{
    timeframe: "TODAY" | "WEEK" | "MONTH" | "ALL";
    pageSize: number;
    taskData: TaskOccurrence[];
}

const initialState: TaskState = {
    timeframe: "TODAY",
    pageSize: 5,
    taskData: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTimeFrame: (state, action:PayloadAction<"TODAY" | "WEEK" | "MONTH" | "ALL">) =>{
            state.timeframe= action.payload;
        },
        setPageSize: (state, action:PayloadAction<number>) =>{
            state.pageSize= action.payload;
        },
        setTask: (state, action:PayloadAction<TaskOccurrence[]>) =>{
            state.taskData = action.payload;
        }
    }
})

export const {setTimeFrame, setPageSize ,setTask} = taskSlice.actions
export default taskSlice.reducer;