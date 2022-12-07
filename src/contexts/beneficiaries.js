import { BeneficiaryService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  beneficiaries: [],
  singleBeneficiary: {},
  chainData: {},
  refresh: false,
  filter: {},
  wards: [],
  getBeneficiariesList: () => {},
  getBeneficiaryById: () => {},
  setChainData: () => {},
  refreshData: () => {},
  setFilter: () => {},
  getAllWards: () => {},
};

const BeneficiaryContext = createContext(initialState);

export const BeneficiaryProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const setFilter = (filter) => setState((prev) => ({ ...prev, filter }));

  const getBeneficiariesList = useCallback(async () => {
    let filter = state.filter;
    // let filter = state.filter?.name?.length > 3 || state.filter?.phone?.length > 3 ? state.filter : {};

    const response = await BeneficiaryService.getBeneficiariesList(filter);

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
    return formatted;
  }, [state.filter]);

  const setChainData = useCallback((chainData) => {
    setState((prev) => ({
      ...prev,
      chainData,
    }));
  }, []);

  const getBeneficiaryById = useCallback(async (id) => {
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
    return formatted;
  }, []);

  const getAllWards = useCallback(async () => {
    const response = await BeneficiaryService.getAllWards();
    const formatted = response.data
      .sort((a, b) => a - b)
      .map((item) => ({
        label: item,
        value: item,
      }));
    setState((prev) => ({
      ...prev,
      wards: formatted,
    }));
    return formatted;
  }, []);

  const contextValue = {
    ...state,
    refreshData,
    setFilter,
    setChainData,
    getBeneficiariesList,
    getBeneficiaryById,
    getAllWards,
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
