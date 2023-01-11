import { BeneficiaryService, CommunicationsService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TwimlService } from '@services/twiml';
import { useSnackbar } from 'notistack';

const initialState = {
  beneficiaries: [],
  singleBeneficiary: {},
  chainData: {},
  refresh: false,
  filter: {},
  wards: [],
  pagination: {
    start: 0,
    limit: 50,
    count: 0,
  },
  communicationsTableData: [],
  callBeneficiaryAudioList: [],
  getBeneficiariesList: () => {},
  getBeneficiaryById: () => {},
  setChainData: () => {},
  refreshData: () => {},
  setFilter: () => {},
  setPagination: () => {},
  getAllWards: () => {},
  getCommunicationByBeneficiaryId: () => {},
  getCallBeneficiaryAudioList: () => {},
  callBeneficiary: () => {},
};

const BeneficiaryContext = createContext(initialState);

export const BeneficiaryProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const snackBar = useSnackbar();

  const setFilter = (filter) =>
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
      },
      filter,
    }));

  const setPagination = (pagination) => setState((prev) => ({ ...prev, pagination }));

  const getBeneficiariesList = useCallback(async () => {
    let filter = {
      limit: state.pagination?.limit,
      start:
        // state.filter?.name?.length > 3 || state.filter?.phone?.length || state.filter?.ward
        //   ? 0
        state.pagination?.start,
      // page: state.pagination?.page <= 0 ? 1 : state.pagination?.page,
      name: state.filter?.name?.length > 3 ? state.filter?.name : undefined,
      phone: state.filter?.phone?.length > 3 ? state.filter?.phone : undefined,
      ward: state.filter?.ward,
    };

    console.log('filter', filter);
    // let filter = state.filter?.name?.length > 3 || state.filter?.phone?.length > 3 ? state.filter : {};

    const response = await BeneficiaryService.getBeneficiariesList(filter);

    const formatted = response.data.data?.data?.map((item) => ({
      ...item,
      id: item?.id,
      registrationDate: item?.created_at,
      registeredBy: item?.mobilizer,
    }));

    let stateData = {
      beneficiaries: {
        data: formatted,
        count: response.data?.data.count,
        start: response.data?.data.start,
        limit: response.data?.data.limit,
        totalPage: response.data?.data.totalPage,
      },
    };

    setState((prevState) => ({
      ...prevState,
      ...stateData,
    }));
    return stateData;
  }, [state.filter, state.pagination]);

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

  const getCommunicationByBeneficiaryId = useCallback(async (id) => {
    const response = await CommunicationsService.getCommunicationByBeneficiaryId(id);
    const formatted = response.data.data.map((item) => ({
      ...item,
    }));
    setState((prev) => ({
      ...prev,
      communicationsTableData: formatted,
    }));

    return response.data;
  }, []);

  const getCallBeneficiaryAudioList = useCallback(async (params) => {
    const response = await TwimlService.getAudios(params);

    const formatted = response?.data?.data.map((item) => ({
      label: item,
      value: item,
    }));

    setState((prevState) => ({
      ...prevState,
      callBeneficiaryAudioList: formatted,
    }));
  }, []);

  const callBeneficiary = useCallback(async (payload) => {
    try {
      const response = await TwimlService.createCall(payload);
      snackBar.enqueueSnackbar(response?.data?.message || 'Calling the beneficiary.', {
        variant: 'success',
      });
      return response;
    } catch (e) {
      snackBar.enqueueSnackbar(e?.response?.data?.message || 'Cannot call beneficiary at the moment.', {
        variant: 'error',
      });
    }
  }, []);

  const contextValue = {
    ...state,
    refreshData,
    setFilter,
    setPagination,
    setChainData,
    getBeneficiariesList,
    getBeneficiaryById,
    getAllWards,
    getCommunicationByBeneficiaryId,
    getCallBeneficiaryAudioList,
    callBeneficiary,
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
