import axios from 'axios';
import actions from './userActions';

const getUserInfo = () => async dispatch => {
  dispatch(actions.getUserInfoRequest());
  try {
    const response = await axios.get('/api/user/current/');
    dispatch(actions.getUserInfoSuccess(response.data));
  } catch (error) {
    dispatch(actions.getUserInfoError(error.message));
  }
};

export default { getUserInfo };
