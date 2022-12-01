import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StepTracker from './StepTracker';
import { useRouter } from 'next/router';
import { TreeTracker } from '@components/tree';
import DetailTable from './DetailTable';

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

const tree = [
  {
    nodeName: 'Jaleswor Palika',
    childNode: [
      {
        nodeName: 'Ward 1',
        balance: 1000,
        disbursed: 1000,
        childNode: [
          {
            nodeName: 'Leaf Level 3',
            childNode: [
              {
                nodeName: 'Ward 1',
                balance: 1000,
                disbursed: 1000,
                childNode: [
                  {
                    nodeName: 'Leaf Level 3',
                  },
                ],
              },
              {
                nodeName: 'Ward 2',
              },
            ],
          },
        ],
      },
      {
        nodeName: 'Ward 2',
        childNode: [
          {
            nodeName: 'Ward 1',
            balance: 1000,
            disbursed: 1000,
            childNode: [
              {
                nodeName: 'Leaf Level 3',
                childNode: [
                  {
                    nodeName: 'Ward 1',
                    balance: 1000,
                    disbursed: 1000,
                    childNode: [
                      {
                        nodeName: 'Leaf Level 3',
                        childNode: [
                          {
                            nodeName: 'Ward 1',
                            balance: 1000,
                            disbursed: 1000,
                            childNode: [
                              {
                                nodeName: 'Leaf Level 3',
                              },
                            ],
                          },
                          {
                            nodeName: 'Ward 2',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    nodeName: 'Ward 2',
                    childNode: [
                      {
                        nodeName: 'Ward 1',
                        balance: 1000,
                        disbursed: 1000,
                        childNode: [
                          {
                            nodeName: 'Leaf Level 3',
                          },
                        ],
                      },
                      {
                        nodeName: 'Ward 2',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            nodeName: 'Ward 2',
          },
        ],
      },
    ],
  },
];

const Tracker = (props) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <div>
      <StepTracker activeStep={2} steps={STEPS} />
      <TreeTracker tree={tree} onNodeClick={handleNodeClick} />
      <DetailTable selectedNode={selectedNode} />
    </div>
  );
};

Tracker.propTypes = {};

export default Tracker;
