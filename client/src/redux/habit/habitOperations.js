import axios from 'axios';
import actions from './habitActions';
import childOperations from '../children/childrenOperations';

// const domain = process.env.DOMAIN_ADDRESS;
//todo token
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZmQ3YzY0MzA1ZWIyMTUwYjAwMmRjNTYiLCJpYXQiOjE2MDc5Nzg2OTAsImV4cCI6MTYwODE1MTQ5MH0.MjiV-6iBMs-iOALSI7EmAvCaMR_UY5yiKelsSk2gmD4';
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
// import { setToken } from '../auth/authOperations';

const getAllHabits = () => async dispatch => {
  dispatch(actions.getAllHabitsRequest());
  try {
    const response = await axios.get(`/api/habits/`);
    dispatch(actions.getAllHabitsSuccess(response.data));
  } catch (error) {
    dispatch(actions.getAllHabitsError(error));
  }
};

const addHabit = habit => async dispatch => {
  dispatch(actions.createHabitRequest());
  try {
    const response = await axios.post(`/api/habits/`, { ...habit });
    dispatch(actions.createHabitSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(actions.createHabitError(error.message));
    return false;
  }
};

const updateHabit = (data, id) => async dispatch => {
  dispatch(actions.updateHabitRequest());
  try {
    await axios.patch(`/api/habits/${id}`, data).then(res => {
      dispatch(actions.updateHabitSuccess(res.data));
    });
    return true;
  } catch (error) {
    dispatch(actions.updateHabitError(error.message));
    return false;
  }
};

const checkHabitDone = (id, data) => async dispatch => {
  dispatch(actions.checkHabitRequest());
  try {
    await axios.patch(`/api/habits/${id}/check`, data).then(res => {
      dispatch(actions.checkHabitSuccess(res.data));
    });
    dispatch(childOperations.getAllChildren());
    dispatch(getAllHabits());
  } catch (error) {
    dispatch(actions.checkHabitError(error.message));
  }
};

const deleteHabit = id => async dispatch => {
  dispatch(actions.deleteHabitRequest());
  try {
    await axios.delete(`/api/habits/${id}`).then(() => {
      dispatch(actions.deleteHabitSuccess(id));
    });
  } catch (error) {
    dispatch(actions.deleteHabitError(error.message));
  }
};

export default {
  getAllHabits,
  addHabit,
  updateHabit,
  checkHabitDone,
  deleteHabit,
};
