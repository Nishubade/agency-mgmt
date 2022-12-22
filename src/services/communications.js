import client from '@utils/client';

export const CommunicationsService = {
  getCommunicationsList(params) {
    return client.get('/communications', { params });
  },
};
