import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddTodoAction {
  id: string, text: string
};

export interface Todo {
  id: string, text: string, completed: boolean
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [] as Todo[],
    reducers: {
      addTodo(state, action: PayloadAction<AddTodoAction>) {
        const { id, text } = action.payload;
        state.push({ id, text, completed: false })
      },
      toggleTodo(state, action: PayloadAction<string>) {
        const todo = state.find(todo => todo.id === action.payload)
        if (todo) {
          todo.completed = !todo.completed
        }
      }
    }
  });

export const { addTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;