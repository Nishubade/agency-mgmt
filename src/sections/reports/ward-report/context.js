import { ReportingService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import * as Service from './service';

const initialState = {
  wardChartData: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByGenderChart: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  dailyWageByWard: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByLandOwnership: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByDisability: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getTransactionsCountByWard: () => {},

  getWardGenderChart: (ward) => {},
  getWardDailyWageChart: (ward) => {},
  getWardLandOwnershipChart: (ward) => {},
  getWardDisabilityChart: (ward) => {},
};

const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getTransactionsCountByWard = useCallback(async () => {
    const response = await ReportingService.getTransactionsClaimCountByWard();

    const chartLabel = response.data.data.map((d) => `Ward ${d.ward}`);

    const chartData = [
      {
        name: 'Claimed',
        data: response.data.data.map((d) => d.claimed),
      },
      {
        name: 'Not Claimed',
        data: response.data.data.map((d) => d.notClaimed),
      },
    ];

    setState((prevState) => ({
      ...prevState,
      wardChartData: {
        chartLabel,
        chartData,
      },
    }));
  }, []);

  const getWardGenderChart = useCallback(async (ward, filterKey) => {
    const response = await Service.getGroupWardClaimByKeys(ward, filterKey);
    const chartLabel = ['Claimed', 'Not Claimed'];

    const chartData = response.data.data.map((d) => ({
      name: d[filterKey],
      data: [d.claimed, d.unclaimed],
    }));

    const claimChartData = {
      chartLabel,
      chartData,
    };

    setState((prevState) => ({
      ...prevState,
      wardByGenderChart: claimChartData,
    }));
  }, []);

  const getWardDailyWageChart = useCallback(async (ward, filterKey) => {
    const response = await Service.getGroupWardClaimByKeys(ward, filterKey);
    const chartLabel = ['Claimed', 'Not Claimed'];

    const chartData = response.data.data.map((d) => ({
      name: d[filterKey] === true ? 'Daily Wage' : 'Not Daily Wage',
      data: [d.claimed, d.unclaimed],
    }));

    const claimChartData = {
      chartLabel,
      chartData,
    };

    setState((prevState) => ({
      ...prevState,
      dailyWageByWard: claimChartData,
    }));
  }, []);

  const getWardLandOwnershipChart = useCallback(async (ward, filterKey) => {
    const response = await Service.getGroupWardClaimByKeys(ward, filterKey);
    const chartLabel = ['Claimed', 'Not Claimed'];

    const chartData = response.data.data.map((d) => ({
      name: d[filterKey] === true ? 'No Land' : 'Has Land',
      data: [d.claimed, d.unclaimed],
    }));

    const claimChartData = {
      chartLabel,
      chartData,
    };

    setState((prevState) => ({
      ...prevState,
      wardByLandOwnership: claimChartData,
    }));
  }, []);
  const getWardDisabilityChart = useCallback(async (ward, filterKey) => {
    const response = await Service.getGroupWardClaimByKeys(ward, filterKey);
    const chartLabel = ['Claimed', 'Not Claimed'];

    const chartData = response.data.data.map((d) => ({
      name: d[filterKey] === true ? 'Disabled' : 'Not Disabled',
      data: [d.claimed, d.unclaimed],
    }));

    const claimChartData = {
      chartLabel,
      chartData,
    };

    setState((prevState) => ({
      ...prevState,
      wardByDisability: claimChartData,
    }));
  }, []);

  const contextValues = {
    ...state,
    getWardGenderChart,
    getTransactionsCountByWard,
    getWardDailyWageChart,
    getWardLandOwnershipChart,
    getWardDisabilityChart,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useModuleContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useModuleContext must be used within a ModuleContextProvider');
  }
  return context;
};
