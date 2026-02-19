import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type TaskPriority = "Urgent" | "High" | "Mid" | "Low";

export interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  deadline: string;
  state: string;
}

interface TasksState {
  tasks: Task[];
}

const saved = localStorage.getItem("tasks");
const initialState: TasksState = saved
  ? { tasks: JSON.parse(saved) }
  : { tasks: [] };

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      state.tasks.push({ ...action.payload, id: nanoid() });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    moveTask: (
      state,
      action: PayloadAction<{ taskId: string; newState: string }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) task.state = action.payload.newState;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, moveTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
