import { BeneficiaryService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useErrorHandler } from '@hooks/useErrorHandler';

const initialState = {
  beneficiaries: [],
  singleBeneficiary: {},

  getBeneficiariesList: () => {},
  getBeneficiaryById: () => {},
  error: {},
  errorMessage: null,
};

const BeneficiaryContext = createContext(initialState);

export const BeneficiaryProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { errorMessage } = useErrorHandler(state.error);

  const getBeneficiariesList = useCallback(async (params) => {
    try {
      const response = await BeneficiaryService.getBeneficiariesList(params);

      const formatted = response.data.data.map((item) => ({
        ...item,

        id: item?._id,
        registrationDate: item?.created_at,
        registeredBy: `${item?.created_by?.name?.first} ${item?.created_by?.name?.last}`,
      }));

      setState((prevState) => ({
        ...prevState,
        beneficiaries: formatted,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  }, []);

  const getBeneficiaryById = useCallback(async (id) => {
    try {
      const response = await BeneficiaryService.getBeneficiaryById(id);

      const formatted = {
        ...response.data,
        email: response.data?.email || 'N/A',
        registrationDate: response.data?.extras?.registration_date || 'N/A',
        ward: response.data?.extras?.ward || 'N/A',
        govtId: response.data?.govt_id || 'N/A',
        govtIdType: response.data?.extras?.govtId_type || 'N/A',
        id: response.data?._id,
        education: response.data?.extras?.education || 'N/A',
        profession: response.data?.extras?.profession || 'N/A',
        bankName: response.data?.extras?.bank || 'N/A',
        bankAccountName: response.data?.bank_account?.account_name || 'N/A',
        bankAccountNumber: response.data?.bank_account?.account_number || 'N/A',
        bankSwiftCode: response.data?.bank_account?.swift_code || 'N/A',
        projects: response.data?.projects || [],
      };

      setState((prev) => ({
        ...prev,
        singleBeneficiary: formatted,
      }));
      return response.data.data;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error,
      }));
    }
  }, []);

  const contextValue = {
    ...state,
    errorMessage,
    getBeneficiariesList,
    getBeneficiaryById,
  };

  return <BeneficiaryContext.Provider value={contextValue}>{children}</BeneficiaryContext.Provider>;
};

BeneficiaryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBeneficiaryContext = () => {
  const context = useContext(BeneficiaryContext);
  if (!context) {
    throw new Error('useBeneficiaryContext must be used within a BeneficiaryProvider');
  }
  return context;
};
