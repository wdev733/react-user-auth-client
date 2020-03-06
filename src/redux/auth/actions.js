import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
} from 'Constants/actionTypes';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const loginUserFailed = status => ({
  type: LOGIN_USER_FAILED,
  payload: { status }
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload : {history}
});
