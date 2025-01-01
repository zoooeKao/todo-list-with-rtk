import {configureStore} from '@reduxjs/toolkit';
import {todoSlice} from '../features/crud-todo/create-thunk-slice';

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
