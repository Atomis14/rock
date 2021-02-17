import { ApiCore } from './utilities/core.js';

const messagesAPI = new ApiCore('/messages', {
  get: true,
  getOne: false,
  post: true,
  put: false,
  patch: false,
  remove: true,
  removeOne: true
});

export { messagesAPI };