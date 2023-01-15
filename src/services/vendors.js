import clientApi, { rahatApi } from '@utils/client';

export const VendorService = {
  getVendorsList(params) {
    return clientApi.get('/vendors', {
      params,
    });
  },

  getVendorById(id) {
    return rahatApi.get(`/vendors/${id}`);
  },

  getVendorsByWard(ward) {
    return clientApi.get(`/vendors/ward/${ward}`);
  },
};
