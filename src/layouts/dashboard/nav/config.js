// routes
import { PATH_BENEFICIARY, PATH_DASHBOARD, PATH_PROJECTS, PATH_VENDORS } from '@routes/paths';
// components
import SvgColor from '@components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.one,
        icon: ICONS.dashboard,
      },
      {
        title: 'Projects',
        path: PATH_PROJECTS.root,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Beneficiary',
        path: PATH_BENEFICIARY.root,
        icon: ICONS.analytics,
      },
      {
        title: 'Vendors',
        path: PATH_VENDORS.root,
        icon: ICONS.analytics,
      },
      {
        title: 'Mobilizers',
        path: PATH_DASHBOARD.three,
        icon: ICONS.analytics,
      },
      {
        title: 'Financial Institutions',
        path: PATH_DASHBOARD.three,
        icon: ICONS.analytics,
      },
      {
        title: 'Administation',
        path: PATH_DASHBOARD.three,
        icon: ICONS.analytics,
        children: [
          {
            title: 'Campaigns',
            path: PATH_DASHBOARD.three,
          },
          {
            title: 'Users',
            path: PATH_DASHBOARD.three,
          },
        ],
      },
    ],
  },
];

export default navConfig;
