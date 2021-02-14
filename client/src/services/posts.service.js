import { ApiCore } from './utilities/core.js';

const postsAPI = new ApiCore('/posts', {
  get: true,
  getOne: false,
  post: true,
  put: true,
  patch: true,
  remove: true,
  removeOne: true
});

export { postsAPI };