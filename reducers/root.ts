import { combineReducers } from 'redux';
import { todosReducer, Todo } from './todos';

export default combineReducers(
    { todos: todosReducer }
);

export interface State {
    todos: Todo[]
};