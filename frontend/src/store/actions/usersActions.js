import {push} from "connected-react-router";
import {toast} from "react-toastify";

import {
	LOGIN_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserFailure = error => ({type: LOGOUT_USER_FAILURE, error});

export const registerUser = userData => {
	return async dispatch => {
		try {
			dispatch(registerUserRequest());

			await axiosApi.post('/users', userData);
			dispatch(registerUserSuccess());
			toast.info('Вы успешно зарегистрировались', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/login'));
		} catch (error) {
			if (error.response) {
				dispatch(registerUserFailure(error.response.data));
			} else {
				dispatch(registerUserFailure({global: "Плохое интернет соединение"}));
			}
		}
	}
};

export const loginUser = userData => {
	return async dispatch => {
		try {
			dispatch(loginUserRequest());

			const response = await axiosApi.post('/users/sessions', userData);
			dispatch(loginUserSuccess(response.data));
			toast.info(`Вы успешно вошли, ${response.data.username}`, {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
		} catch (error) {
			if (error.response) {
				dispatch(loginUserFailure(error.response.data));
			} else {
				dispatch(loginUserFailure({global: "Плохое интернет соединение"}));
			}
		}
	}
};

export const logoutUser = () => {
	return async dispatch => {
		try {
			dispatch(logoutUserRequest());

			await axiosApi.delete('/users/sessions');
			dispatch(logoutUserSuccess());
			toast.info('Вы успешно покинули свой аккаунт', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
		} catch (error) {
			dispatch(logoutUserFailure(error.response.data));
		}
	}
};

export const editUser = userData => {
	return async dispatch => {
		try {
			const response = await axiosApi.put('/users', userData);
			dispatch(loginUserSuccess(response.data));
			dispatch(push('/'));
		} catch (error) {
			dispatch(loginUserFailure(error.response.data));
		}
	}
};