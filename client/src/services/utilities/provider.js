import axios from 'axios';
import { handleResponse, handleError } from './response.js';

axios.defaults.baseURL = '/api';

/** @param {string} resource */
const get = (resource) => {
  return axios
    .get(resource)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const getOne = (resource, id) => {
  return axios
    .get(`${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model) => {
  return axios
    .post(resource, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model) => {
  return axios
    .put(resource, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model) => {
  return axios
    .patch(resource, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const remove = (resource) => {
  return axios
    .delete(resource)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const removeOne = (resource, id) => {
  return axios
    .delete(`${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};


export const apiProvider = {
  get,
  getOne,
  post,
  put,
  patch,
  remove,
  removeOne
};