import {createContext} from 'react';

export const AuthContext = createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
  isProfileClick : false,
  onProfileClick: () => {},
  onBackClick : () => {}
});
