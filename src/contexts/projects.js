import { ProjectService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useErrorHandler } from '@hooks/useResponseHandler';

const initialState = {
  projects: [],
  singleProject: {},
  beneficiaries: [],
  vendors: [],
  refresh: false,
  error: {},
  getProjectsList: () => {},
  getProjectById: () => {},
  getBeneficiariesByProject: () => {},
  getVendorsByProject: () => {},
  refreshData: () => {},
};

const ProjectsContext = createContext(initialState);

export const ProjectProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { errorMessage } = useErrorHandler(state.error);

  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const getProjectsList = useCallback(async (params) => {
    try {
      const response = await ProjectService.getProjectsList(params);
      const formatted = response.data.data.map((item) => ({
        ...item,
        projectManager: item?.project_manager?.name
          ? `${item?.project_manager?.name?.first} ${item?.project_manager?.name?.last}`
          : '-',
        createdAt: item?.created_at,
        balance: item?.allocations[0]?.amount,
        id: item?._id,
      }));

      setState((prevState) => ({
        ...prevState,
        projects: formatted,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  }, []);

  const getProjectById = useCallback(async (id) => {
    try {
      const response = await ProjectService.getProjectById(id);

      const formatted = {
        ...response.data,
        projectManagerName: response.data?.project_manager?.name
          ? `${response.data?.project_manager?.name?.first} ${response.data?.project_manager?.name?.last}`
          : '-',
        projectCreatedAt: response.data?.project_manager?.created_at,
      };

      setState((prev) => ({
        ...prev,
        singleProject: formatted,
      }));
      return response.data.data;
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  }, []);

  const getBeneficiariesByProject = useCallback(async (projectId) => {
    try {
      const response = await ProjectService.getBeneficiariesByProject(projectId);

      const formatted = response.data.data;

      setState((prev) => ({
        ...prev,
        beneficiaries: formatted,
      }));
      return response.data.data;
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  }, []);

  const getVendorsByProject = useCallback(async (projectId) => {
    try {
      const response = await ProjectService.getVendorsByProject(projectId);

      const formatted = response.data.data;

      setState((prev) => ({
        ...prev,
        vendors: formatted,
      }));
      return response.data.data;
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  }, []);

  const contextValue = {
    ...state,
    errorMessage,
    refreshData,
    getProjectsList,
    getProjectById,
    getBeneficiariesByProject,
    getVendorsByProject,
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProjectContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
