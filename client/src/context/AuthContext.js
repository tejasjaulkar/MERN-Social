import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer.js';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isfetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // console.log("AuthContextProvider state:", state); 
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isfetching: state.isfetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
