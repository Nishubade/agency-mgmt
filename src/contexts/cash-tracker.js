import { BeneficiaryService, VendorService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/auth/useAuthContext';

const initialState = {
  beneficiariesByWard: {
    data: [],
    count: 0,
    numOfBenefRemainingToClaim: 0,
  },
  vendorByWard: {},
  getBeneficiariesByWard: () => {},
};

const CashTrackerContext = createContext(initialState);

export const CashTrackerProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { roles } = useAuthContext();

  const getBeneficiariesByWard = useCallback(async (params) => {
    const response = await BeneficiaryService.getBeneficiariesByWard(params);
    const vendorResponse = await VendorService.getVendorsByWard(params);

    const formatted = response?.data?.data?.data?.map((item) => ({
      ...item,
      claimed: item?.claimed ? 'Yes' : 'No',
      name: !roles.isPalika ? 'xxxxxx' : item.name,
      totalTokenIssued: item.totalTokenIssued?.toString(),
      cashBalance: item.cashBalance?.toString(),
      tokenBalance: item.tokenBalance?.toString(),
      mode: item.isOffline ? 'Offline' : 'Online',
      method: item.isQR ? 'QR' : 'SMS',
    }));
    setState((prevState) => ({
      ...prevState,
      beneficiariesByWard: {
        data: formatted,
        count: response?.data?.data?.count,
        numOfBenefRemainingToClaim: response?.data?.data?.numOfBenefRemainingToClaim,
      },
      vendorByWard: vendorResponse?.data?.data,
    }));
  }, []);

  const contextValue = {
    ...state,
    getBeneficiariesByWard,
  };

  return <CashTrackerContext.Provider value={contextValue}>{children}</CashTrackerContext.Provider>;
};

CashTrackerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCashTrackerContext = () => {
  const context = useContext(CashTrackerContext);
  if (!context) {
    throw new Error('useCashTrackerContext must be used within a CashTrackerContext');
  }
  return context;
};
