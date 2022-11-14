import { createContext, useContext, useState } from 'react';
import { useAuthContext } from '../../../auth/useAuthContext';
import { login } from './services';

const initialState = {
  loginHandler: () => {},
};

const LoginContext = createContext(initialState);

export function LoginProvider({ children }) {
  //   const [state, setState] = useState(initialState);

  const { addToken } = useAuthContext();

  const loginHandler = async (payload) => {
    const response = await login(payload);

    const { accessToken, user } = response.data;

    addToken(accessToken);
  };

  const contextValue = {
    //   ...state,
    loginHandler,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
}

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
