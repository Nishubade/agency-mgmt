import axios from 'axios';
// import qs from 'query-string';
import { HOST_API, RAHAT_BACKEND } from '@config';

import { getAccessToken } from './sessionManager';

const accessToken = getAccessToken();

const api = axios.create({
  //   baseURL: 'https://minimal-assets-api-dev.vercel.app',
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    accessToken,
  },
  // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || { ...error, message: 'Something went wrong. Please Contact Admin' }
    )
);

export const rahatApi = axios.create({
  //   baseURL: 'https://minimal-assets-api-dev.vercel.app',
  baseURL: RAHAT_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    access_token: accessToken,
  },
  // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

rahatApi.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || { ...error, message: 'Something went wrong. Please Contact Admin' }
    )
);

export default api;

// export default api;
