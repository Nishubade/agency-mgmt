import { ProjectService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';

const initialState = {
  projects: [],
  singleProject: {},
  getProjectsList: () => {},
  getProjectById: () => {},
};

const ProjectsContext = createContext(initialState);

export const ProjectProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getProjectsList = useCallback(async (params) => {
    const response = await ProjectService.getProjectsList(params);
    const formatted = response.data.data.map((item) => ({
      ...item,
      projectManager: `${item?.project_manager?.name?.first} ${item?.project_manager?.name?.last}`,
      createdAt: item?.created_at,
      balance: item?.allocations[0]?.amount,
      id: item?._id,
    }));

    setState((prevState) => ({
      ...prevState,
      projects: formatted,
    }));
  }, []);

  const getProjectById = useCallback(async (id) => {
    const response = await ProjectService.getProjectById(id);

    const formatted = response.data.data;

    setState((prev) => ({
      ...prev,
      singleProject: formatted,
    }));
    return response.data.data;
  }, []);

  const contextValue = {
    ...state,
    getProjectsList,
    getProjectById,
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

export const useProjectContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
