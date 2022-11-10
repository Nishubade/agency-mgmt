import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container as MuiContainer } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import Headerbreadcrumbs from '@components/Headerbreadcrumbs';
import { useSettingsContext } from '@components/settings';

const ContainerComponent = ({ children, title, action, breadcrumbLinks }) => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      {' '}
      <MuiContainer maxWidth={themeStretch ? false : 'lg'}>
        <Headerbreadcrumbs
          heading={title}
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, ...breadcrumbLinks]}
          action={action}
        />

        <Card>{children}</Card>
      </MuiContainer>
    </>
  );
};
ContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  action: PropTypes.node,
  breadcrumbLinks: PropTypes.array,
};

export default ContainerComponent;
