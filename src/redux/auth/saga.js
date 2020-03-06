
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { loginAPI } from '../../services/axios/api';

import { clearToken } from "Services/axios/utility";

import {
    LOGIN_USER,
    LOGOUT_USER,
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    logoutUser,
    loginUserFailed
} from './actions';

import { loginErrorType } from 'Constants/defaultValues';

const loginWithEmailPasswordAsync = async (email, password) =>
  await loginAPI(email, password)
    .then(authUser => authUser)
    .catch(error => error);

function* loginWithEmailPassword({ payload }) {

	const { email, password } = payload.user;
	const { history } = payload;
	
	try {
			const loginUser = yield call(loginWithEmailPasswordAsync, email, password);

			if (loginUser.data) {

                let userId = loginUser.data.id;
                let accessToken = loginUser.data.token;
                if (accessToken !== '') {
                    
                    // Save admin info to localStorage
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('accessToken', accessToken);

                    let authData = {
                        userId,
                        accessToken
                    };

                    yield put(loginUserSuccess(authData));
                    history.push('/');

                    return;
                }
			} else {
                yield put(loginUserFailed(loginErrorType.INVALID_PASSWORD))
            }
	} catch (error) {
			// catch throw
			console.log('login error : ', error)
	}
}

function* logout({payload}) {
    const { history } = payload;
    try {
        localStorage.removeItem('accessToken');
        yield call(logoutUser, history);
        history.push('/');
    } catch (error) {
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
    ]);
}