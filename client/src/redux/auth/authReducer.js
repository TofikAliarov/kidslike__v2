import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './authActions';

const tokenReducer = createReducer(null, {
  [actions.signinSuccess]: (_, actions) => {
    return actions.payload.token;
  },
  [actions.signoutSuccess]: (_, __) => null,
  [actions.signoutError]: (_, __) => null,
  [actions.signinError]: (_, __) => null,
});

export default combineReducers({
  token: tokenReducer,
});
