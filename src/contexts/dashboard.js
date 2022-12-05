import { DashboardService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  summary: {},
  mapData: [],
  error: {},
  getSummary: () => {},
  getGeoMapData: () => {},
};

const DashboardContext = createContext(initialState);

export const DashboardProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getSummary = useCallback(async () => {
    try {
      const response = await DashboardService.getBeneficiarySummary();
      setState((prev) => ({
        ...prev,
        summary: response.data,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error,
      }));
    }
  }, []);

  const getGeoMapData = useCallback(async () => {
    try {
      const response = await DashboardService.getGeoMapData();
      setState((prev) => ({
        ...prev,
        mapData: response.data,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error,
      }));
    }
  }, []);

  const contextValue = {
    ...state,
    getSummary,
    getGeoMapData,
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardContext');
  }
  return context;
};
