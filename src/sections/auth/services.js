import api, { rahatApi } from '@services/client';

export const login = (data) => api.post('/api/account/login', data);

export const otpRequest = (data) => rahatApi.post('/users/otp_by_mail', data);

export const verifyOtp = (data) => rahatApi.post('/users/otp_verification', data);
