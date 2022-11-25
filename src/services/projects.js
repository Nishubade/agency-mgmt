import { rahatApi } from '@utils/client';

export const ProjectService = {
  getProjectsList(params) {
    return rahatApi.get('/projects', {
      params,
    });
  },
  getProjectById(id) {
    return rahatApi.get(`/projects/${id}`);
  },
};
