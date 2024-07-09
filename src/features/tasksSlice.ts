import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export interface TaskMode {
  id: string;
  mode: "view" | "update";
}

interface TasksState {
  tasks: Task[];
  mode: TaskMode | null;
  filter: "complete" | "incomplete" | "sort" | "all";
}

const initialState: TasksState = {
  tasks: [],
  mode: null,
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<"complete" | "incomplete" | "sort" | "all">
    ) => {
      state.filter = action.payload;
    },
    addMode: (state, action: PayloadAction<TaskMode>) => {
      state.mode = action.payload;
    },
    clearMode: (state) => {
      state.mode = null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompletion,
  addMode,
  clearMode,
  setFilter,
} = tasksSlice.actions;
export default tasksSlice.reducer;
