import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './taskActions';

const userTasksState = [];

const userTasks = createReducer([], {
  [actions.getAllTasksSuccess]: (_, { payload }) => payload,
  [actions.createTaskSuccess]: (state, { payload }) => [...state, payload],
  [actions.updateTaskSuccess]: (state, { payload }) =>
    state.map(el => (el._id === payload._id ? (el = payload) : el)),
  [actions.deleteTaskSuccess]: (state, { payload }) =>
    state.filter(el => el._id !== payload),
  [actions.changeTasksStatusSuccess]: (state, { payload }) =>
    state.map(el => (el._id === payload._id ? (el = payload) : el)),
});

const loaderTasksList = createReducer(true, {
  [actions.getAllTasksRequest]: () => true,
  [actions.getAllTasksSuccess]: () => false,
  [actions.getAllTasksError]: () => false,
});

const loaderTask = createReducer(false, {
  [actions.createTaskRequest]: () => true,
  [actions.createTaskSuccess]: () => false,
  [actions.createTaskError]: () => false,
  [actions.updateTaskRequest]: () => true,
  [actions.updateTaskSuccess]: () => false,
  [actions.updateTaskError]: () => false,
  [actions.deleteTaskRequest]: () => true,
  [actions.deleteTasksSuccess]: () => false,
  [actions.deleteTasksError]: () => false,
});

const errorTasksList = createReducer(false, {
  [actions.getAllTasksRequest]: () => false,
  [actions.getAllTasksSuccess]: () => false,
  [actions.getAllTasksError]: (_, { payload }) => payload,
});

const errorTask = createReducer(false, {
  [actions.createTaskRequest]: () => false,
  [actions.createTaskSuccess]: () => false,
  [actions.createTaskError]: (_, { payload }) => payload,
  [actions.updateTaskRequest]: () => false,
  [actions.updateTaskSuccess]: () => false,
  [actions.updateTaskError]: (_, { payload }) => payload,
  // [actions.deleteTaskRequest]: () => false,
  // [actions.deleteTasksSuccess]: () => false,
  // [actions.deleteTasksError]: (_, { payload }) => payload,
});

export default combineReducers({
  userTasks,
  loaderTasksList,
  loaderTask,
  errorTasksList,
  errorTask,
});
