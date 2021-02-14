import { ApiCore } from './utilities/core.js';
import { apiProvider } from './utilities/provider.js';

const authAPI = new ApiCore('/auth', {
  get: true,
  getOne: true,
  post: true,
  put: false,
  patch: false,
  delete: false,
  deleteOne: true
});

authAPI.post = (specifier, model) => {
  return apiProvider.post(`${authAPI.url}/${specifier}`, model);
}

export { authAPI };