import { isValid } from 'date-fns';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
// utils
// import { isValidToken, setSession } from '../utils/jwt';
import {
  isValidToken,
  saveAccessToken,
  getAccessToken,
  deleteAccessToken,
  saveCurrentUser,
  saveKey,
  getCurrentUser,
  getKey,
  clearStorage,
} from '@utils/sessionManager';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false, // should be false by default,
  isInitialized: false,
  token: null,
  user: null,
  keyData: null,
  addToken: () => {},
  deleteToken: () => {},
  addUser: () => {},
  addKey: () => {},
  logout: () => {},
};

const AppAuthContext = createContext({
  ...initialState,
  method: 'jwt',
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const localToken = getAccessToken();
const localUser = getCurrentUser();
const localKey = getKey();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    const initialize = async () => {
      setAuthState((prev) => ({ ...prev, isInitialized: true }));
      try {
        if (localToken && isValidToken(localToken)) {
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            token: localToken,
            user: localUser,
            keyData: localKey,
          }));

          //  const response = await axios.get('/api/account/my-account');
          //  const { user } = response.data;
        } else {
          setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, []);

  const addToken = (payload) => {
    // console.log('payload', payload);
    // if (!isValid(payload)) {
    //   return 'Invalid token';
    // }
    if (payload) {
      setAuthState((prev) => ({ ...prev, token: payload }));
      saveAccessToken(payload);
    }
  };

  const addKey = (payload) => {
    if (payload) {
      setAuthState((prev) => ({ ...prev, keyData: payload }));
      saveKey(payload);
    }
  };

  const addUser = (user) => {
    setAuthState((prev) => ({ ...prev, user }));
    saveCurrentUser(user);
  };

  const deleteToken = () => {
    deleteAccessToken();
    setAuthState((prev) => ({ ...prev, isInitialized: true, token: '' }));
  };

  const logout = () => {
    clearStorage();
    setAuthState((prev) => ({
      ...prev,
      isInitialized: true,
      isAuthenticated: false,
      token: '',
      user: null,
      keyData: null,
    }));
  };

  const contextProps = {
    ...authState,
    deleteToken,
    addToken,
    addUser,
    addKey,
    logout,
  };

  return <AppAuthContext.Provider value={contextProps}>{children}</AppAuthContext.Provider>;
}

export { AppAuthContext, AuthProvider };

export const useAppAuthContext = () => useContext(AppAuthContext);
