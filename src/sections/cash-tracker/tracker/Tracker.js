import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailTable from './DetailTable';
import dynamic from 'next/dynamic';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { BeneficiaryService } from '@services/beneficiaries';

const TreeTracker = dynamic(() => import('@components/tree/TreeOrganization'), { ssr: false });

let tree = [
  {
    nodeName: 'Jaleswor Palika',
    childNode: [],
  },
];

const Tracker = (props) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [treeData, setTreeData] = useState(tree);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const buildTreeData = useCallback(async () => {
    const response = await BeneficiaryService.getAllWards();
    tree[0].childNode = response.data
      .sort((a, b) => a - b)
      .map((w) => ({
        nodeName: `Ward ${w}`,
        balance: 1000,
        disbursed: 1000,
      }));
    setTreeData(tree);
  }, []);

  useEffect(() => {
    buildTreeData();
  }, [buildTreeData, treeData]);

  return (
    <div>
      <TreeTracker tree={treeData} onNodeClick={handleNodeClick} />
      <DetailTable selectedNode={selectedNode} />
    </div>
  );
};

Tracker.propTypes = {};

export default Tracker;
