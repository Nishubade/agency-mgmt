import { BLOCKCHAIN_EXPLORER } from '@config';
import axios from 'axios';

const api = axios.create({
  baseURL: BLOCKCHAIN_EXPLORER,
});

const EthExplorer = {
  getLogs: async (params) => {
    const response = await api.get('/api', {
      module: 'logs',
      action: 'getLogs',
      fromBlock: 0,
      toBlock: 'latest',
      ...params,
    });
    return response.data;
  },
};

export default EthExplorer;
