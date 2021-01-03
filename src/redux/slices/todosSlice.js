import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  value: [
    { id: 0, task: "Homework", status: "pending" },
    { id: 2, task: "Lunch", status: "done" },
    { id: 1, task: "Dinner", status: "pending" },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.value.push(action.payload);
      },
      prepare: (task) => {
        const id = nanoid();
        return { payload: { id, task, status: "pending" } };
      },
    },
    toggleTodo: (state, action) => {
      let idx = null;
      state.value.forEach((todo, i) => {
        if (todo.id === action.payload) {
          idx = i;
        }
      });
      state.value[idx].status =
        state.value[idx].status === "pending" ? "done" : "pending";
    },

    deleteTodo: (state, action) => {
      let idx = null;

      state.value.forEach((todo, i) => {
        if (todo.id === action.payload) {
          idx = i;
        }
      });

      state.value.splice(idx, 1);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos.value;

export default todosSlice.reducer;
