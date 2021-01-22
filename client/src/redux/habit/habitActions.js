import { createAction } from '@reduxjs/toolkit';

const createHabitRequest = createAction('habit/createHabitRequest');
const createHabitSuccess = createAction('habit/createHabitSuccess');
const createHabitError = createAction('habit/createHabitError');

const updateHabitRequest = createAction('habit/updateHabitRequest');
const updateHabitSuccess = createAction('habit/updateHabitSuccess');
const updateHabitError = createAction('habit/updateHabitError');

const deleteHabitRequest = createAction('habit/deleteHabitRequest');
const deleteHabitSuccess = createAction('habit/deleteHabitSuccess');
const deleteHabitError = createAction('habit/deleteHabitError');

const getAllHabitsRequest = createAction('habit/getAllHabitsRequest');
const getAllHabitsSuccess = createAction('habit/getAllHabitsSuccess');
const getAllHabitsError = createAction('habit/getAllHabitsError');

const checkHabitRequest = createAction('habit/checkHabitRequest');
const checkHabitSuccess = createAction('habit/checkHabitSuccess');
const checkHabitError = createAction('habit/checkHabitError');

export default {
  createHabitRequest,
  createHabitSuccess,
  createHabitError,
  updateHabitRequest,
  updateHabitSuccess,
  updateHabitError,
  deleteHabitRequest,
  deleteHabitSuccess,
  deleteHabitError,
  getAllHabitsRequest,
  getAllHabitsSuccess,
  getAllHabitsError,
  checkHabitRequest,
  checkHabitSuccess,
  checkHabitError,
};
