import { rahatApi } from '@utils/client';

export const DashboardService = {
  getBeneficiarySummary() {
    return rahatApi.get('/stats/beneficiaries/summary');
  },

  getGeoMapData() {
    return rahatApi.get('/stats/beneficiaries/geo');
  },
};
