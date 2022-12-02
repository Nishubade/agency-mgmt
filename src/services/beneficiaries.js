import { rahatApi } from '@utils/client';

export const BeneficiaryService = {
  getBeneficiariesList(params) {
    return rahatApi.get('/beneficiaries', {
      params,
    });
  },

  getBeneficiaryById(id) {
    return rahatApi.get(`/beneficiaries/${id}`);
  },

  //   getBeneficiariesByProject(projectId) {
  //     return rahatApi.get(`/projects/${projectId}/beneficiaries`);
  //   },

  //   getVendorsByProject(projectId) {
  //     return rahatApi.get(`/projects/${projectId}/vendors`);
  //   },
};
