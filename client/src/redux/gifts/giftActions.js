import { createAction } from '@reduxjs/toolkit';

const createGiftRequest = createAction('gift/createGiftRequest');
const createGiftSuccess = createAction('gift/createGiftSuccess');
const createGiftError = createAction('gift/createGiftError');


const updateGiftRequest = createAction('gift/updateGiftRequest');
const updateGiftSuccess = createAction('gift/updateGiftSuccess');
const updateGiftError = createAction('gift/updateGiftError');


const deleteGiftRequest = createAction('gift/deleteGiftRequest');
const deleteGiftSuccess = createAction('gift/deleteGiftSuccess');
const deleteGiftError = createAction('gift/deleteGiftError');


const getAllGiftsRequest = createAction('gift/getAllGiftsRequest');
const getAllGiftsSuccess = createAction('gift/getAllGiftsSuccess');
const getAllGiftsError = createAction('gift/getAllGiftsError');

export default {
    createGiftRequest,
    createGiftSuccess,
    createGiftError,
    updateGiftRequest,
    updateGiftSuccess,
    updateGiftError,
    deleteGiftRequest,
    deleteGiftSuccess,
    deleteGiftError,
    getAllGiftsRequest,
    getAllGiftsSuccess,
    getAllGiftsError,
}