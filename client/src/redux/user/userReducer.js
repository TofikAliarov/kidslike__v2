import { createReducer } from '@reduxjs/toolkit';
import actions from './userActions';

const userInfo = createReducer({}, {
  [actions.getUserInfoSuccess]: (state, { payload }) => ({username: payload.username, avatarURL: payload.avatarURL})
});

export default userInfo;
