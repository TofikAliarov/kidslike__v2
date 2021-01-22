import axios from 'axios';
import actions from './childrenActions';

// import { baseURL } from '../config';
// axios.defaults.baseURL = baseURL;
// const domain = process.env.DOMAIN_ADDRESS;

//todo token
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZmQ3YTc2YWJiMzczNDBiYjcxYTQxYWEiLCJpYXQiOjE2MDc5NzMyMjksImV4cCI6MTYwODE0NjAyOX0.lKRAeF8D-g1r7HCq-1Ngjm_cTsb7vFzQBjpxQcdm-04';
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

// import { setToken } from '../auth/authOperations';

const getAllChildren = () => async dispatch => {
  dispatch(actions.getAllChildrensRequest());
  try {
    const response = await axios.get(`/api/childs/`);
    dispatch(actions.getAllChildrensSuccess(response.data));
  } catch (error) {
    dispatch(actions.getAllChildrensError(error));
  }
};

const addChildren = children => async dispatch => {
  dispatch(actions.createChildrenRequest());
  try {
    const response = await axios.post(`/api/childs/`, { ...children });
    dispatch(actions.createChildrenSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(actions.createChildrenError(error.message));
    return false;
  }
};

const updateChildren = (data, id) => async dispatch => {
  dispatch(actions.updateChildrenRequest());
  try {
    await axios.patch(`/api/childs/${id}`, data).then(res => {
      dispatch(actions.updateChildrenSuccess(res.data));
    });
    return true;
  } catch (error) {
    dispatch(actions.updateChildrenError(error.message));
    return false;
  }
};

const deleteChildren = id => async dispatch => {
  dispatch(actions.deleteChildrenRequest());
  try {
    await axios.delete(`/api/childs/${id}`).then(() => {
      dispatch(actions.deleteChildrenSuccess(id));
    });
  } catch (error) {
    dispatch(actions.deleteChildrenError(error.message));
  }
};

export default {
  getAllChildren,
  addChildren,
  updateChildren,
  deleteChildren,
};
