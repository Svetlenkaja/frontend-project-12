import React, { useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, resetUser } from '../slices/authSlice.js';
import appPath from '../routes.js';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const nav = useNavigate();

  const logIn = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    dispatch(setUser(user));
    nav(appPath.home());
  };

  const logOut = () => {
    dispatch(resetUser());
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    nav(appPath.login());
  };

  const auth = useMemo(() => ({
    token,
    logIn,
    logOut,
  }), [token, logIn, logOut]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
