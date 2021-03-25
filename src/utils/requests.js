const HostDictionaryByEnv = {
  development: 'http://localhost:5000',
  production: 'https://todaycarrot-findme.ga',
};

export const HOST = HostDictionaryByEnv[process.env.NODE_ENV] || 'development';

export const SIGN_IN_PATH = HOST + '/users/signin';

export const SIGN_UP_PATH = HOST + '/users/signup';

export const SIGN_OUT_PATH = HOST + '/users/signout';

export const UPDATE_PASSWORD_PATH = HOST + '/users/update';

export const DELETE_USER_PATH = HOST + '/users/delete';

export const GET_QUESTION_PATH = HOST + '/intro';

export const ADD_ANSWER_PATH = HOST + '/answer/add';

export const LIST_ANSWER_PATH = HOST + '/answer';

export const READ_ANSWER_PATH = HOST + '/answer/read';

export const EDIT_ANSWER_PATH = HOST + '/answer/edit';
// eslint-disable-next-line
export default {
  HOST,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  SIGN_OUT_PATH,
  UPDATE_PASSWORD_PATH,
  GET_QUESTION_PATH,
  ADD_ANSWER_PATH,
  LIST_ANSWER_PATH,
  READ_ANSWER_PATH,
  EDIT_ANSWER_PATH,
};
