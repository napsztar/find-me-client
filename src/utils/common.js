import { Redirect } from 'react-router-dom';
import React from 'react';

const equalsDate = (dateA, dateB = new Date()) =>
  dateA.toLocaleString() === dateB.toLocaleString();
const isEmptyObject = obj => Object.keys(obj).length === 0;


const getNeedLogInPage = (component, isLoggedIn) => {
  // advanced :: isloggedin 의 t/f 여부를 webLocalStorage 를 보고 판단
  if (isLoggedIn === true) {
    return component;
  } else if (isLoggedIn === false) {
    return () => <Redirect to="/signin" />;
  }
};

const toDateFormat = dateString => dateString.split('T')[0];

export { equalsDate, isEmptyObject, toDateFormat,getNeedLogInPage };

