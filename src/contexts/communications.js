import { BeneficiaryService, CommunicationsService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TwimlService } from '@services/twiml';

const initialState = {
  communicationsList: {
    data: [],
  },
  beneficiaryOptions: [],
  beneficiaryList: [],
  audiosList: [],
  wards: [],
  filter: {},
  pagination: {
    start: 0,
    limit: 50,
    count: 0,
  },
  getCommunicationsList: () => {},
  getBeneficiariesList: () => {},
  getAudiosList: () => {},
  getWards: () => {},
  setFilter: () => {},
  setPagination: () => {},
};

const CommunicationsContext = createContext(initialState);

export const CommunicationsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setFilter = (filter) => {
    if (!filter) {
      setState((prev) => ({
        ...prev,
        filter: null,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        // pagination: {
        //   ...prev.pagination,
        // },
        filter: {
          ...prev.filter,
          ...filter,
        },
      }));
    }
  };
  const setPagination = (pagination) => setState((prev) => ({ ...prev, pagination }));

  const getCommunicationsList = useCallback(async () => {
    let filterObj = {
      limit: state.pagination?.limit,
      start: state.pagination?.start,
      to: state.filter?.to?.length > 3 ? state.filter?.to : undefined,
      ward: state.filter?.ward,
      hasBank: state.filter?.hasBank !== undefined ? (state.filter?.hasBank === 'banked' ? true : false) : undefined,
      type: state.filter?.type,
      status: state.filter?.status,
    };

    console.log({ filterObj });

    const response = await CommunicationsService.getCommunicationsList(filterObj);

    const formatted = response?.data?.data?.data?.map((item) => ({
      ...item,
    }));

    setState((prevState) => ({
      ...prevState,
      communicationsList: {
        data: formatted,
        count: response.data?.data.count,
        start: response.data?.data.start,
        limit: response.data?.data.limit,
        totalPage: response.data?.data.totalPage,
      },
    }));

    return response.data.data;
  }, [state.filter, state.pagination]);

  console.log(state.filter);

  const getBeneficiariesList = useCallback(async (params) => {
    const response = await BeneficiaryService.getBeneficiariesList(params);

    const beneficiaryList = response?.data?.data?.data?.map((item) => ({
      phone: item.phone,
      name: item.name,
      id: item.id,
    }));

    const beneficiaryOptions = response?.data?.data?.data?.map((item) => ({
      label: `${item.phone} - ${item.name}`,
      value: item.phone,
    }));

    setState((prevState) => ({
      ...prevState,
      beneficiaryList,
      beneficiaryOptions,
    }));
  }, []);

  const getAudiosList = useCallback(async (params) => {
    const response = await TwimlService.getAudios(params);
    const formatted = response?.data?.data;

    setState((prevState) => ({
      ...prevState,
      audiosList: formatted,
    }));
  }, []);

  const getWards = useCallback(async (params) => {
    const response = await BeneficiaryService.getAllWards(params);
    const formatted = response?.data
      .sort((a, b) => a - b)
      .map((item) => ({
        label: item,
        value: item,
      }));

    setState((prevState) => ({
      ...prevState,
      wards: formatted,
    }));
    return formatted;
  }, []);

  const contextValue = {
    ...state,
    getCommunicationsList,
    getBeneficiariesList,
    getAudiosList,
    getWards,
    setFilter,
    setPagination,
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
