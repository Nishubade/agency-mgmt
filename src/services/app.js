import { rahatApi } from '@utils/client';

export const AppService = {
  getAppSettings() {
    return rahatApi.get('/app/settings');
  },
};
