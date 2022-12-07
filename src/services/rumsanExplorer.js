import { BLOCKCHAIN_EXPLORER } from '@config';
import axios from 'axios';

const api = axios.create({
  baseURL: BLOCKCHAIN_EXPLORER,
});

const RumsanExplorerService = {
  getTransaction: async (params) => {
    const response = await api.get('/api', {
      params,
    });
    return response.data;
  },
};

export default RumsanExplorerService;
