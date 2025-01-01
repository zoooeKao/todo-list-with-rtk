import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAddTodo, fetchDeleteTodo, fetchLogin, fetchTodoList, fetchUpdateTodo} from '../api';

export const getTodoList = createAsyncThunk('todos/getTodoList', async () => {
  const login = await fetchLogin();
  if (!login.isLoggedIn) return null;
  const result = await fetchTodoList();
  return result.todos;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await fetchUpdateTodo(todo);
  return response;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const response = await fetchDeleteTodo(id);
  return response;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  // 延遲兩秒以模擬 Spinner 顯示
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetchAddTodo(todo);
  return response;
});

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'idle';
      })
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = 'idle';
      });
  },
});
