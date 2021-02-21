import store from '../../store/index.js';

export function handleResponse(response) {
  if (response.results) {
    return response.results;
  }

  if (response.data) {
    return response.data;
  }

  return response;
}

export function handleError(error) {
  if(error.response.config.url != '/auth') {
    store.dispatch('notifications/setNotification', {
      type: 'error',
      message: error.response.data,
      id: Date.now()
    });
  }
  throw error;
}