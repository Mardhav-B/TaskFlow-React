import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";
import boardReducer from "../features/boardSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    boards: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
