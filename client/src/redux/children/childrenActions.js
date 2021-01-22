import { createAction } from '@reduxjs/toolkit';

const createChildrenRequest = createAction('children/createChildrenRequest');
const createChildrenSuccess = createAction('children/createChildrenSuccess');
const createChildrenError = createAction('children/createChildrenError');

const updateChildrenRequest = createAction('children/updateChildrenRequest');
const updateChildrenSuccess = createAction('children/updateChildrenSuccess');
const updateChildrenError = createAction('children/updateChildrenError');

const getAllChildrensRequest = createAction('children/getAllChildrensRequest');
const getAllChildrensSuccess = createAction('children/getAllChildrensSuccess');
const getAllChildrensError = createAction('children/getAllChildrensError');

const deleteChildrenRequest = createAction('children/deleteChildrenRequest');
const deleteChildrenSuccess = createAction('children/deleteChildrenSuccess');
const deleteChildrenError = createAction('children/deleteChildrenError');

export default {
  createChildrenRequest,
  createChildrenSuccess,
  createChildrenError,
  updateChildrenRequest,
  updateChildrenSuccess,
  updateChildrenError,
  deleteChildrenRequest,
  deleteChildrenSuccess,
  deleteChildrenError,
  getAllChildrensRequest,
  getAllChildrensSuccess,
  getAllChildrensError,
};
