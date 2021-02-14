import { ApiCore } from './utilities/core.js';

const postsAPI = new ApiCore('/posts', {
  getAll: true,
  getSingle: false,
  post: true,
  put: true,
  patch: true,
  delete: true
});

export { postsAPI };