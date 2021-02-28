import { ApiCore } from './core/core.js';

const messagesAPI = new ApiCore('/messages', {
  get: true,
  getOne: false,
  post: true,
  put: false,
  patch: false,
  remove: false,
  removeOne: true
});

export { messagesAPI };