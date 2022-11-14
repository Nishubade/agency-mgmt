import { isValid } from 'date-fns';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
// utils
// import { isValidToken, setSession } from '../utils/jwt';
import { isValidToken, saveAccessToken, getAccessToken, deleteAccessToken } from '../utils/sessionManager';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false, // should be false by default,
  isInitialized: false,
  token: null,
  user: null,
};

const AppAuthContext = createContext({
  ...initialState,
  method: 'jwt',
  addToken: () => {},
  deleteToken: () => {},
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const localToken = getAccessToken();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);

  const addToken = (payload) => {
    if (!isValid(payload)) {
      return 'Invalid token';
    }
    if (payload) {
      setAuthState((prev) => ({ ...prev, token: payload }));
      saveAccessToken(payload);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setAuthState((prev) => ({ ...prev, isInitialized: true }));
      try {
        if (localToken && isValidToken(localToken)) {
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            token: localToken,
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

  const deleteToken = () => {
    deleteAccessToken();
    setAuthState((prev) => ({ ...prev, isInitialized: true, token: '' }));
  };
  const contextProps = {
    ...authState,
    deleteToken,
    addToken,
  };

  return <AppAuthContext.Provider value={contextProps}>{children}</AppAuthContext.Provider>;
}

export { AppAuthContext, AuthProvider };

export const useAppAuthContext = () => useContext(AppAuthContext);
