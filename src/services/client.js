import axios from 'axios';
import qs from 'query-string';
import { HOST_API } from '@config';

import { getAccessToken } from '../utils/sessionManager';

const accessToken = getAccessToken();

const api = axios.create({
  //   baseURL: 'https://minimal-assets-api-dev.vercel.app',
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    accessToken,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

export default api;
