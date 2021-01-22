import axios from 'axios';
import actions from './giftActions';
//import authErrorActions from '../auth/authActions';
import childrenActions from '../children/childrenActions';

// const domain = process.env.DOMAIN_ADDRESS;
//todo token
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZmQ3YzY0MzA1ZWIyMTUwYjAwMmRjNTYiLCJpYXQiOjE2MDc5Nzg2OTAsImV4cCI6MTYwODE1MTQ5MH0.MjiV-6iBMs-iOALSI7EmAvCaMR_UY5yiKelsSk2gmD4';

// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

const getAllGifts = () => async dispatch => {
  dispatch(actions.getAllGiftsRequest());
  try {
    const response = await axios.get(`/api/gifts/`);
    dispatch(actions.getAllGiftsSuccess(response.data));
  } catch (error) {
    dispatch(actions.getAllGiftsError(error));
    // if (error.response && error.response.status === 401) {
    //   dispatch(authErrorActions.signinError());
    // }
  }
};

const addGift = giftData => async dispatch => {
  dispatch(actions.createGiftRequest());
  try {
    const response = await axios({
      method: 'post',
      url: `/api/gifts/`,
      data: giftData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(actions.createGiftSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(actions.createGiftError(error.message));
    return false;
  }
};

const updateGift = (giftData, id) => async dispatch => {
  dispatch(actions.updateGiftRequest());
  try {
    const response = await axios({
      method: 'patch',
      url: `/api/gifts/${id}`,
      data: giftData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(actions.updateGiftSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(actions.updateGiftError(error.message));
    return false;
  }
};

const buyGift = purchaseData => async dispatch => {
  const { id, price, childId } = purchaseData;
  dispatch(childrenActions.updateChildrenRequest());
  try {
    const response = await axios({
      method: 'patch',
      url: `/api/gifts/purchase/${id}`,
      data: { price, childId },
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(childrenActions.updateChildrenSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(childrenActions.updateChildrenError(error.message));
    return false;
  }
};

const deleteGift = id => async dispatch => {
  dispatch(actions.deleteGiftRequest());
  try {
    await axios.delete(`/api/gifts/${id}`).then(() => {
      dispatch(actions.deleteGiftSuccess(id));
    });
  } catch (error) {
    dispatch(actions.deleteGiftError(error.message));
  }
};

export { getAllGifts, addGift, updateGift, deleteGift, buyGift };
