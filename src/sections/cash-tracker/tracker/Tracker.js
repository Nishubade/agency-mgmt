import React from 'react';
import PropTypes from 'prop-types';
import StepTracker from './StepTracker';
import { useRouter } from 'next/router';
// import TreeTracker from './TreeTracker';

const STEPS = [
  {
    label: 'Unicef Innovation Fund',
    budget: 150000,
    balance: 0,
  },
  {
    label: 'Unicef Nepal',
    balance: 0,
  },
  {
    label: 'Jaleshwor Palika',
    balance: 120000,
    hasCash: true,
  },
  {
    label: 'Wards',
    balance: 200000,
    budget: 0,
  },
  {
    label: 'Total',
    balance: 100000,
    budget: 0,
    beneficiaries: 10,
  },
];

const Tracker = (props) => {
  const router = useRouter();
  return (
    <div>
      <StepTracker activeStep={2} steps={STEPS} />
      {/* <TreeTracker /> */}
    </div>
  );
};

Tracker.propTypes = {};

export default Tracker;
