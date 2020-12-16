export const getErrorMessage = error => error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

export const setHeaders = (token) => token ? { headers: { 'Authorization': `Bearer ${token}` } } : null;