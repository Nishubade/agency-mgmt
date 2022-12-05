import { MobilizerService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useErrorHandler } from '@hooks/useResponseHandler';

const initialState = {
  mobilizers: [],
  singleMobilizer: {},

  getMobilizersList: () => {},
  getByMobilizerId: () => {},
  error: {},
  errorMessage: null,
};

const MoblizerContext = createContext(initialState);

export const MobilizerProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { errorMessage } = useErrorHandler(state.error);

  const getMobilizersList = useCallback(async (params) => {
    try {
      const response = await MobilizerService.getMobilizersList(params);

      const formatted = response.data.data.map((item) => ({
        ...item,

        id: item?._id,
        registrationDate: item?.created_at,
        registeredBy: `${item?.created_by?.name?.first} ${item?.created_by?.name?.last}`,
      }));

      setState((prevState) => ({
        ...prevState,
        mobilizers: formatted,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  }, []);

  const getByMobilizerId = useCallback(async (id) => {
    try {
      const response = await MobilizerService.getByMobilizerId(id);

      const formatted = {
        ...response.data,
        email: response.data?.email || 'N/A',
        registrationDate: response.data?.created_at || 'N/A',
        pan: response.data?.pan || 'N/A',
        shopName: response.data?.shopName || 'N/A',
        projects: response.data?.projects || [],
      };

      setState((prev) => ({
        ...prev,
        singleMobilizer: formatted,
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
    getMobilizersList,
    getByMobilizerId,
  };

  return <MoblizerContext.Provider value={contextValue}>{children}</MoblizerContext.Provider>;
};

MobilizerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMobilizerContext = () => {
  const context = useContext(MoblizerContext);
  if (!context) {
    throw new Error('useMobilizerContext must be used within a MoblizerContext');
  }
  return context;
};
