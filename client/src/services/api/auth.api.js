import { ApiCore } from './core/core.js';

const authAPI = new ApiCore('/auth', {
  get: true,
  getOne: true,
  post: true,
  put: false,
  patch: false,
  delete: false,
  deleteOne: true
});

export { authAPI };