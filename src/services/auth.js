import { rahatApi } from '@services/client';

export const AuthService = {
  otpRequest(data) {
    return rahatApi.post('/users/otp_by_mail', data);
  },
  verifyOtp(data) {
    return rahatApi.post('/users/otp_verification', data);
  },
};
