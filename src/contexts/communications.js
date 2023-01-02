import { BeneficiaryService, CommunicationsService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TwimlService } from '@services/twiml';

const initialState = {
  communicationsList: [],
  beneficiaryOptions: [],
  beneficiaryList: [],
  audiosList: [],
  getCommunicationsList: () => {},
  getBeneficiariesList: () => {},
  getAudiosList: () => {},
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

  const contextValue = {
    ...state,
    getCommunicationsList,
    getBeneficiariesList,
    getAudiosList,
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
