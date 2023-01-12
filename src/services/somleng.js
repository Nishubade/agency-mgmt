import { SOMLENG_API, SOMLENG_API_KEY, SOMLENG_API_TOKEN } from '@config';
import axios from 'axios';

const authConfig = {
  auth: {
    username: SOMLENG_API_KEY,
    password: SOMLENG_API_TOKEN,
  },
};

const somlengApi = axios.create({
  baseURL: SOMLENG_API,
  ...authConfig,
});

export const SomlengService = {
  createCall(payload) {
    return somlengApi.post(`/2010-04-01/Accounts/${SOMLENG_API_KEY}/Calls`, payload);
  },
};
