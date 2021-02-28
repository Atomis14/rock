import { ApiCore } from './core/core.js';

const usersAPI = new ApiCore('/users', {
  get: true,
  getOne: true,
  post: false,
  put: true,
  patch: true,
  remove: false,
  removeOne: true
});

export { usersAPI };