import api from '@services/client';

export const login = (data) => api.post('/api/account/login', data);
