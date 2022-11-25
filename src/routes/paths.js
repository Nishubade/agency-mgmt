// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_PROJECTS = '/projects';
const ROOTS_BENEFICIARY = '/beneficiaries';
const ROOTS_VENDORS = '/vendors';
const ROOTS_MOBILIZERS = '/mobilizers';
const ROOTS_FINANCIAL_INSTITUTIONS = '/financial-institutions';
const ROOTS_REPORTS = '/reports';

const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
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
  list: path(ROOTS_VENDORS, '/list'),
};

export const PATH_MOBILIZERS = {
  root: ROOTS_MOBILIZERS,
};

export const PATH_FINANCIAL_INSTITUTIONS = {
  root: ROOTS_FINANCIAL_INSTITUTIONS,
};

export const PATH_REPORTS = {
  root: ROOTS_REPORTS,
  demographic: path(ROOTS_REPORTS, '/demographic'),
  anomaly: path(ROOTS_REPORTS, '/anomaly'),
  realTime: path(ROOTS_REPORTS, '/real-time'),
  transaction: path(ROOTS_REPORTS, '/transactions'),
  wardReport: path(ROOTS_REPORTS, '/ward-report'),
};
