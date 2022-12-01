import { isValid } from 'date-fns';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
  getWalletAddressFromPrivateKey,
} from '@utils/sessionManager';
import { AppService } from '@services';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false, // should be false by default,
  isInitialized: false,
  token: null,
  user: null,
  keyData: null,
  chainUrl: null,
  claimToken: null,
  contracts: null,
  addresses: null,
  wallet: null,
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
const wallet = getWalletAddressFromPrivateKey();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);

  const getAppSettings = async () => {
    try {
      const response = await AppService.getAppSettings();
      return response.data;
    } catch (err) {
      console.log('Unable to Load App Setting from Server', err);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      // setAuthState((prev) => ({ ...prev, isInitialized: true }));
      try {
        if (localToken && isValidToken(localToken)) {
          const appSettings = await getAppSettings();
          console.log('appSettings', appSettings);
          setAuthState((prev) => ({
            ...prev,
            isInitialized: true,
            isAuthenticated: true,
            token: localToken,
            user: localUser,
            keyData: localKey,
            chainUrl: appSettings?.networkUrl,
            claimToken: {
              ...appSettings?.agency?.token,
              address: appSettings?.agency?.contracts?.rahat_erc20,
              agencyId: appSettings?.agency?.id,
            },
            contracts: appSettings?.agency?.contracts,
            addresses: appSettings?.addresses,
            wallet,
          }));
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

  const contextProps = useMemo(
    () => ({
      ...authState,
      deleteToken,
      addToken,
      addUser,
      addKey,
      logout,
    }),
    [authState]
  );

  return <AppAuthContext.Provider value={contextProps}>{children}</AppAuthContext.Provider>;
}

export { AppAuthContext, AuthProvider };

export const useAppAuthContext = () => useContext(AppAuthContext);
