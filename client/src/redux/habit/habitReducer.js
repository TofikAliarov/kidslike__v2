import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './habitActions';

const userHabitsInitialState = [];

const userHabits = createReducer([], {
  [actions.getAllHabitsSuccess]: (_, { payload }) => {
    return payload;
  },

  [actions.createHabitSuccess]: (state, { payload }) => [...state, payload],

  [actions.updateHabitSuccess]: (state, { payload }) =>
    state.map(el => (el._id === payload._id ? (el = payload) : el)),

  [actions.checkHabitSuccess]: (state, { payload }) =>
    state.map(el => (el._id === payload._id ? (el = payload) : el)),

  [actions.deleteHabitSuccess]: (state, { payload }) =>
    state.filter(el => el._id !== payload),
});

const loaderHabitsList = createReducer(true, {
  [actions.getAllHabitsRequest]: () => true,
  [actions.getAllHabitsSuccess]: () => false,
  [actions.getAllHabitsError]: () => false,
});

const loaderHabit = createReducer(false, {
  [actions.createHabitRequest]: () => true,
  [actions.createHabitSuccess]: () => false,
  [actions.createHabitError]: () => false,
  [actions.updateHabitRequest]: () => true,
  [actions.updateHabitSuccess]: () => false,
  [actions.updateHabitError]: () => false,
  [actions.deleteHabitRequest]: () => true,
  [actions.deleteHabitsSuccess]: () => false,
  [actions.deleteHabitsError]: () => false,
});

const errorHabitsList = createReducer(false, {
  [actions.getAllHabitsRequest]: () => false,
  [actions.getAllHabitsSuccess]: () => false,
  [actions.getAllHabitsError]: (_, { payload }) => payload,
});

const errorHabit = createReducer(false, {
  [actions.createHabitRequest]: () => false,
  [actions.createHabitSuccess]: () => false,
  [actions.createHabitError]: (_, { payload }) => payload,
  [actions.updateHabitRequest]: () => false,
  [actions.updateHabitSuccess]: () => false,
  [actions.updateHabitError]: (_, { payload }) => payload,
  // [actions.deleteHabitRequest]: () => false,
  // [actions.deleteHabitsSuccess]: () => false,
  // [actions.deleteHabitsError]: (_, { payload }) => payload,
});
export default combineReducers({
  userHabits,
  loaderHabitsList,
  loaderHabit,
  errorHabitsList,
  errorHabit,
});
