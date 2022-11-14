// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_PROJECTS = '/projects';
const ROOTS_BENEFICIARY = '/beneficiary';
const ROOTS_VENDORS = '/vendors';
const ROOTS_MOBILIZERS = '/mobilizers';
const ROOTS_FINANCIAL_INSTITUTIONS = '/financial-institutions';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};

export const PATH_PROJECTS = {
  root: ROOTS_PROJECTS,
  list: path(ROOTS_PROJECTS, '/list'),
  view: path(ROOTS_PROJECTS, '/[id]/view'),
  addBudget: path(ROOTS_PROJECTS, '/[id]/add-budget'),
};

export const PATH_BENEFICIARY = {
  root: ROOTS_BENEFICIARY,
  list: path(ROOTS_BENEFICIARY, '/list'),
};

export const PATH_VENDORS = {
  root: ROOTS_VENDORS,
};

export const PATH_MOBILIZERS = {
  root: ROOTS_MOBILIZERS,
};

export const PATH_FINANCIAL_INSTITUTIONS = {
  root: ROOTS_FINANCIAL_INSTITUTIONS,
};
