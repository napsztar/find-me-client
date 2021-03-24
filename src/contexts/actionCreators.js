import { LOGIN, LOGOUT, TAKETOKEN } from './actionTypes';

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
export const taketoken = accToken => {
  return {
    type: TAKETOKEN,
    payload: accToken,
  };
};
