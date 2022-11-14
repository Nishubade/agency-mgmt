import jwtDecode from 'jwt-decode';

export const getCurrentUser = () => {
  let user = null;
  const data = localStorage.getItem('currentUser');
  if (data) user = JSON.parse(data);
  return user;
};

export const saveCurrentUser = (userData) =>
  typeof window !== 'undefined' ? localStorage.setItem('currentUser', JSON.stringify(userData)) : '';

export const getAccessToken = () => (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '');

export const saveAccessToken = (accessToken) =>
  typeof window !== 'undefined' ? localStorage.setItem('accessToken', accessToken) : null;

export const deleteAccessToken = () => (typeof window !== 'undefined' ? localStorage.removeItem('accessToken') : null);

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
