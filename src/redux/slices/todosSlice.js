import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = "https://600cdf0ef979dd001745c3e2.mockapi.io/v1";

const initialState = {
  value: [],
};

export const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/todos`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT}/todos`, newTodo);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (todo, thunkAPI) => {
    try {
      const { data } = await axios.put(`${API_ENDPOINT}/todos/${todo.id}`, {
        ...todo,
        status: todo.status ? false : true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${API_ENDPOINT}/todos/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,

  extraReducers: {
    [loadTodos.pending]: (state) => {
      console.log("Loading...");
    },
    [loadTodos.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [loadTodos.rejected]: (state, action) => {
      console.log("Error on loading...");
    },

    [addTodo.pending]: (state) => {
      console.log("Adding...");
    },
    [addTodo.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    },
    [addTodo.rejected]: (state, action) => {
      console.log("Error on adding...");
    },

    [toggleTodo.pending]: (state) => {
      console.log("Toggling...");
    },
    [toggleTodo.fulfilled]: (state, action) => {
      state.value = state.value.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        } else {
          return action.payload;
        }
      });
    },
    [toggleTodo.rejected]: (state, action) => {
      console.log("Error on toggling...");
    },

    [deleteTodo.pending]: (state) => {
      console.log("deleting...");
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.value = state.value.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    },
    [deleteTodo.rejected]: (state, action) => {
      console.log("Error on deleting...");
    },
  },
});

export const selectTodos = (state) => state.todos.value;

export default todosSlice.reducer;
