import axios from 'axios';
import { handleResponse, handleError } from './response.js';

axios.defaults.baseURL = '/api';

const get = (resource) => {
  return axios
    .get(resource)
    .then(handleResponse)
    .catch(handleError);
};

const getOne = (resource, id) => {
  return axios
    .get(`${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

const post = (resource, model) => {
  return axios
    .post(resource, model)
    .then(handleResponse)
    .catch(handleError);
};

const put = (resource, model) => {
  return axios
    .put(resource, model)
    .then(handleResponse)
    .catch(handleError);
};

const patch = (resource, model) => {
  return axios
    .patch(resource, model)
    .then(handleResponse)
    .catch(handleError);
};

const remove = (resource) => {
  return axios
    .delete(resource)
    .then(handleResponse)
    .catch(handleError);
};

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