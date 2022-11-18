import axios from 'axios';
import qs from 'query-string';
import { HOST_API } from '@config';

import { getAccessToken } from '../utils/sessionManager';

const accessToken = getAccessToken();

console.log('accessToken', accessToken);

const api = axios.create({
  //   baseURL: 'https://minimal-assets-api-dev.vercel.app',
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // accessToken,
  },
  // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || { ...error, message: 'Something went wrong' })
);

export default api;

// export default api;
