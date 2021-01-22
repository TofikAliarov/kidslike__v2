import axios from 'axios';
import authAction from './authActions';
let status;
export const setToken = token =>
  (axios.defaults.headers.common['Authorization'] = token);

export const clearToken = () =>
  (axios.defaults.headers.common['Authorization'] = '');

export const signIn = userData => dispatch => {
  dispatch(authAction.signinRequest());
  status = axios
    .post('/api/auth/signIn', userData)
    .then(response => {
      setToken(response.data.token);
      dispatch(authAction.signinSuccess(response.data));
    })
    .catch(error => {
      //console.log(error);
      return (status = error.message);
      // dispatch(authAction.signInError(error.message));
    });
  return status;
};

export const signUp = userData => dispatch => {
  dispatch(authAction.signupRequest());
  const statusCode = axios
    .post('/api/auth/signUp', userData)
    .then(data => {
      return data.status;
    })
    .catch(error => {
      return (status = error.message);
    });
  return statusCode;
};

// export const signOut = () => dispatch => {
//   clearToken();
//   dispatch(authAction.signOutSuccess());
// };

export const logout = token => dispatch => {
  dispatch(authAction.signoutRequest());
  axios
    .delete('/api/auth/signOut', token)
    .then(() => {
      dispatch(authAction.signoutSuccess());
    })
    .catch(err => dispatch(authAction.signoutError(err)))
    .finally(clearToken());
};

export const googleAuth = data => dispatch => {
  dispatch(authAction.signinRequest());
  axios
    .post('api/auth/google', data)
    .then(response => {
      setToken(response.data.token);
      dispatch(authAction.signinSuccess(response.data));
    })
    .catch(error => {
      return (status = error.message);
      // dispatch(authAction.signInError(error.message));
    });
};
