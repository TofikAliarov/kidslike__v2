import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './childrenActions';

const userChildrens = createReducer([], {
  [actions.getAllChildrensSuccess]: (_, { payload }) => {
    return payload;
  },

  [actions.createChildrenSuccess]: (state, { payload }) => [
    ...state,
    {
      ...payload,
    },
  ],
  [actions.updateChildrenSuccess]: (state, { payload }) =>
    state.map(el => (el._id === payload._id ? (el = payload) : el)),

  [actions.deleteChildrenSuccess]: (state, { payload }) =>
    state.filter(el => el._id !== payload),
});

const loaderChildrensList = createReducer(true, {
  [actions.getAllChildrensRequest]: () => true,
  [actions.getAllChildrensSuccess]: () => false,
  [actions.getAllChildrensError]: () => false,
});

const loaderChildren = createReducer(false, {
  [actions.createChildrenRequest]: () => true,
  [actions.createChildrenSuccess]: () => false,
  [actions.createChildrenError]: () => false,
  [actions.updateChildrenRequest]: () => true,
  [actions.updateChildrenSuccess]: () => false,
  [actions.updateChildrenError]: () => false,
  [actions.deleteChildrenRequest]: () => true,
  [actions.deleteChildrensSuccess]: () => false,
  [actions.deleteChildrensError]: () => false,
});

const errorChildrensList = createReducer(false, {
  [actions.getAllChildrensRequest]: () => false,
  [actions.getAllChildrensSuccess]: () => false,
  [actions.getAllChildrensError]: (_, { payload }) => payload,
});

const errorChildren = createReducer(false, {
  [actions.createChildrenRequest]: () => false,
  [actions.createChildrenSuccess]: () => false,
  [actions.createChildrenError]: (_, { payload }) => payload,
  [actions.updateChildrenRequest]: () => false,
  [actions.updateChildrenSuccess]: () => false,
  [actions.updateChildrenError]: (_, { payload }) => payload,
  // [actions.deleteChildrenRequest]: () => false,
  // [actions.deleteChildrensSuccess]: () => false,
  // [actions.deleteChildrensError]: (_, { payload }) => payload,
});

export default combineReducers({
  userChildrens,
  loaderChildrensList,
  loaderChildren,
  errorChildrensList,
  errorChildren,
});
