import { ApiCore } from './utilities/core.js';
import { apiProvider } from './utilities/provider.js';

const authAPI = new ApiCore('/auth', {
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: false,
  delete: true
});

authAPI.post = (specifier, model) => {
  return apiProvider.post(`${authAPI.url}/${specifier}`, model);
}

export { authAPI };