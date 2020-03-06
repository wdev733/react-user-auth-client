import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
} from "Constants/actionTypes";

import { loginErrorType } from 'Constants/defaultValues';

const INIT_STATE = {
  user: {
    userId: localStorage.getItem("userId"),
    accessToken: localStorage.getItem("accessToken")
  },
  loading: false,
  authStatus: loginErrorType.AUTH_SUCCESS
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_USER_FAILED:
      return { ...state, loading: false, authStatus: action.payload.status };
    case LOGOUT_USER:
      return { ...state, user: { accessToken: '' } };
    default:
      return { ...state };
  }
};
