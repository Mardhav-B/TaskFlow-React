import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface Board {
  id: string;
  name: string;
}

export interface ColumnState {
  id: string;
  title: string;
}

export interface BoardsSliceState {
  boards: Board[];
  activeBoard: string;
  states: ColumnState[];
}

const savedStates =
  typeof localStorage !== "undefined" && localStorage.getItem("board_states");
const initialStates: ColumnState[] = savedStates
  ? JSON.parse(savedStates)
  : [
      { id: "todo", title: "To Do" },
      { id: "progress", title: "In Progress" },
      { id: "completed", title: "Completed" },
    ];

const initialState: BoardsSliceState = {
  boards: [{ id: "1", name: "My Project" }],
  activeBoard: "1",
  states: initialStates,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoard = action.payload;
    },
    addState: {
      reducer: (state, action: PayloadAction<ColumnState>) => {
        state.states.push(action.payload);
        try {
          localStorage.setItem("board_states", JSON.stringify(state.states));
        } catch {}
      },
      prepare: (title: string) => ({
        payload: { id: nanoid(), title },
      }),
    },
    deleteState: (state, action: PayloadAction<string>) => {
      state.states = state.states.filter((s) => s.id !== action.payload);
      try {
        localStorage.setItem("board_states", JSON.stringify(state.states));
      } catch {}
    },
    reorderStates: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.states.splice(fromIndex, 1);
      state.states.splice(toIndex, 0, removed);
      try {
        localStorage.setItem("board_states", JSON.stringify(state.states));
      } catch {}
    },
  },
});

export const { setActiveBoard, addState, deleteState, reorderStates } =
  boardSlice.actions;
export default boardSlice.reducer;
