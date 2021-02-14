import { apiProvider } from './provider.js';

export class ApiCore {
  constructor(url, options) {
    this.url = url;

    if (options.getAll) {
      this.getAll = () => {
        return apiProvider.getAll(this.url);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id) => {
        return apiProvider.getSingle(this.url, id);
      };
    }

    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(this.url, model);
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
      this.remove = (id) => {
        return apiProvider.remove(this.url, id);
      };
    }
  }
}