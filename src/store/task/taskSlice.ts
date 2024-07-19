
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { addTask, deleteTask, getAllTasks, updateTask  } from "@/server-action/todoActions";

export interface ITask {
    idTask: number;
    libTask: string;
}
export interface TaskSliceState {
    listTask: ITask[];
    status: "success" | "loading" | "failed";

}

const initialState: TaskSliceState = {
    listTask: [],
    status: "success",

};

export const taskSlice = createAppSlice({
    name: "task",
    initialState,
    reducers: (create) => ({
        getAllTaskAsync: create.asyncThunk(
            async () => {
                const response: any = await getAllTasks();
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action: PayloadAction<ITask[]>) => {
                    state.status = "success";
                    state.listTask = action.payload;
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
        addTaskAsync: create.asyncThunk(
            async (libTask: string) => {
                const response: any = await addTask(libTask);
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action: PayloadAction<ITask>) => {
                    state.status = "success";
                    const copyTask = [...state.listTask]
                    state.listTask = [action.payload, ...copyTask];
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
        updateTaskAsync: create.asyncThunk(
            async (data: ITask) => {
                const response: any = await updateTask(data);
                return response.data;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action: PayloadAction<ITask>) => {
                    state.status = "success";
                    const copyTask = [...state.listTask]
                    const index = copyTask.findIndex(item => item.idTask === action.payload.idTask)
                    if (index > -1) {
                        const newTask = [...state.listTask.slice(0, index), { ...action.payload }, ...state.listTask.slice(index + 1)]
                        state.listTask = newTask;
                    }
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
        deleteTaskAsync: create.asyncThunk(
            async (idTask: number) => {
                const response: any = await deleteTask(idTask);
                return response.data;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action: PayloadAction<number>) => {
                    state.status = "success";
                    const copyTask = [...state.listTask]
                    const data = copyTask.filter(item => item.idTask !== action.payload)
                    state.listTask = data;
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
    }),
    selectors: {
        selectTask: (task) => task.listTask,
        selectStatus: (task) => task.status,
    },
})

export const { getAllTaskAsync, addTaskAsync, updateTaskAsync, deleteTaskAsync } = taskSlice.actions;

export const { selectTask, selectStatus } = taskSlice.selectors;
