import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./slices/todosSlice";

export default configureStore({
  reducer: {
    todos: todosReducers,
  },
  devTools: true,
});
