import { VendorService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  vendors: [],
  singleVendor: {},

  getVendorsList: () => {},
  getVendorById: () => {},
};

const VendorsContext = createContext(initialState);

export const VendorProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getVendorsList = useCallback(async (params) => {
    const response = await VendorService.getVendorsList(params);

    const formatted = response.data.data.map((item) => ({
      ...item,

      id: item?._id,
      registrationDate: item?.created_at,
      registeredBy: `${item?.created_by?.name?.first} ${item?.created_by?.name?.last}`,
    }));

    setState((prevState) => ({
      ...prevState,
      vendors: formatted,
    }));
  }, []);

  const getVendorById = useCallback(async (id) => {
    const response = await VendorService.getVendorById(id);

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
      singleVendor: formatted,
    }));
    return response.data.data;
  }, []);

  const contextValue = {
    ...state,
    getVendorsList,
    getVendorById,
  };

  return <VendorsContext.Provider value={contextValue}>{children}</VendorsContext.Provider>;
};

VendorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useVendorsContext = () => {
  const context = useContext(VendorsContext);
  if (!context) {
    throw new Error('useVendorsContext must be used within a VendorsContext');
  }
  return context;
};
