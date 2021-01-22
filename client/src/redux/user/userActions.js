import { createAction } from '@reduxjs/toolkit';

const getUserInfoRequest = createAction('user/getUserInfoRequest');
const getUserInfoSuccess = createAction('user/getUserInfoSuccess');
const getUserInfoError = createAction('user/getUserInfoError');

export default {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoError,
};
