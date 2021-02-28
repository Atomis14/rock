import { apiProvider } from './provider.js';

export class ApiCore {
  constructor(url, options) {
    this.url = url;

    if (options.get) {
      this.get = (specifier='') => {
        return apiProvider.get(this.url + specifier);
      };
    }

    if (options.getOne) {
      this.getOne = (id) => {
        return apiProvider.getOne(this.url, id);
      };
    }

    if (options.post) {
      this.post = (specifier='', model) => {
        return apiProvider.post(this.url + specifier, model);
      };
    }

    if (options.put) {
      this.put = (model) => {
        return apiProvider.put(this.url, model);
      };
    }

    if (options.patch) {
      this.patch = (model) => {
        return apiProvider.patch(this.url, model);
      };
    }

    if (options.remove) {
      this.remove = () => {
        return apiProvider.remove(this.url);
      };
    }

    if (options.removeOne) {
      this.removeOne = (id) => {
        return apiProvider.removeOne(this.url, id);
      };
    }
  }
}