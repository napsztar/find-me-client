import React, { createContext, useState } from 'react';
import { LOGIN, LOGOUT } from './actionTypes';

export const isLoggedIn = false;
export const LoginContext = createContext(false);

export default LoginContext;
