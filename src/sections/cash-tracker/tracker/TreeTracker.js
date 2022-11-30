import { Tree, TreeNode } from 'react-organizational-chart';
import styled from '@emotion/styled';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import PropTypes from 'prop-types';

const StyledNode = styled(Button)`
  ${({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,

    boxShadow: theme.customShadows.z8,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  })}}
`;

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

const TreeNodeCard = ({ node, theme }) => (
  <StyledNode theme={theme}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography fontWeight={700} variant="caption">
          {node?.nodeName}
        </Typography>

        {node.balance && <Typography variant="caption">Balance: {node?.balance} </Typography>}
        {node.disbursed && <Typography variant="caption">Beneficiaries: {node.disbursed} </Typography>}
      </Grid>
    </Stack>
  </StyledNode>
);

TreeNodeCard.propTypes = {
  node: PropTypes.object,
  theme: PropTypes.object,
};

const TreeTracker = () => {
  const theme = useTheme();
  return (
    <>
      {tree.map((nodes) => (
        <Tree key={nodes?.nodeName}>
          <TreeNode label={<TreeNodeCard theme={theme} node={nodes} />}>
            {nodes?.childNode?.map((node) => (
              <TreeNode key={node.nodeName} label={<TreeNodeCard theme={theme} node={node} />}>
                {node?.childNode?.map((node) => (
                  <TreeNode key={node.nodeName} label={<TreeNodeCard theme={theme} node={node} />}>
                    {node?.childNode?.map((node) => (
                      <TreeNode key={node.nodeName} label={<TreeNodeCard theme={theme} node={node} />}>
                        {node?.childNode?.map((node) => (
                          <TreeNode key={node.nodeName} label={<TreeNodeCard theme={theme} node={node} />}>
                            {node?.childNode?.map((node) => (
                              <TreeNode key={node.nodeName} label={<TreeNodeCard theme={theme} node={node} />} />
                            ))}
                          </TreeNode>
                        ))}
                      </TreeNode>
                    ))}
                  </TreeNode>
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        </Tree>
      ))}
    </>
  );
};

export default TreeTracker;
