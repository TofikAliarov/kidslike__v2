import { createAction } from '@reduxjs/toolkit';

const createTaskRequest = createAction('task/createTaskRequest');
const createTaskSuccess = createAction('task/createTaskSuccess');
const createTaskError = createAction('task/createTaskError');

const updateTaskRequest = createAction('task/updateTaskRequest');
const updateTaskSuccess = createAction('task/updateTaskSuccess');
const updateTaskError = createAction('task/updateTaskError');

const deleteTaskRequest = createAction('task/deleteTaskRequest');
const deleteTaskSuccess = createAction('task/deleteTaskSuccess');
const deleteTaskError = createAction('task/deleteTaskError');

const getAllTasksRequest = createAction('task/getAllTasksRequest');
const getAllTasksSuccess = createAction('task/getAllTasksSuccess');
const getAllTasksError = createAction('task/getAllTasksError');

const changeTasksStatusRequest = createAction('task/changeTasksStatusRequest');
const changeTasksStatusSuccess = createAction('task/changeTasksStatusSuccess');
const changeTasksStatusError = createAction('task/changeTasksStatusError');

export default {
  createTaskRequest,
  createTaskSuccess,
  createTaskError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksError,
  changeTasksStatusRequest,
  changeTasksStatusSuccess,
  changeTasksStatusError
};
