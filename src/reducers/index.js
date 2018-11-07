import { combineReducers } from 'redux';
import todoList from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  todoList,
  visibilityFilter
});
