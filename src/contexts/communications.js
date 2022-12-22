import { CommunicationsService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  communicationsList: [],
  getCommunicationsList: () => {},
};

const CommunicationsContext = createContext(initialState);

export const CommunicationsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getCommunicationsList = useCallback(async (params) => {
    const response = await CommunicationsService.getCommunicationsList(params);

    const formatted = response?.data?.data?.data?.map((item) => ({
      ...item,
    }));
    setState((prevState) => ({
      ...prevState,
      communicationsList: formatted,
    }));
  }, []);

  const contextValue = {
    ...state,
    getCommunicationsList,
  };

  return <CommunicationsContext.Provider value={contextValue}>{children}</CommunicationsContext.Provider>;
};

CommunicationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCommunicationsContext = () => {
  const context = useContext(CommunicationsContext);
  if (!context) {
    throw new Error('useCommunicationsContext must be used within a CommunicationsContext');
  }
  return context;
};
