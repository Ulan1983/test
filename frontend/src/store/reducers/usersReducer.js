import {
	DELETE_USER_FAILURE,
	FETCH_USER_FAILURE,
	FETCH_USER_REQUEST, FETCH_USER_SUCCESS,
	FETCH_USERS_FAILURE,
	FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
	registerLoading: false,
	error: null,
	loginLoading: false,
	logoutLoading: false,
	user: null,
	fetchUsersLoading: false,
	users: [],
	fetchUserLoading: false,
	singleUser: null,
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {...state, registerLoading: true};
		case REGISTER_USER_SUCCESS:
			return {...state, registerLoading: false, error: null};
		case REGISTER_USER_FAILURE:
			return {...state, error: action.error, registerLoading: false};
		case LOGIN_USER_REQUEST:
			return {...state, loginLoading: true};
		case LOGIN_USER_SUCCESS:
			return {...state, loginLoading: false, error: null, user: action.user};
		case LOGIN_USER_FAILURE:
			return {...state, error: action.error, loginLoading: false,};
		case LOGOUT_USER_REQUEST:
			return {...state, logoutLoading: true};
		case LOGOUT_USER_SUCCESS:
			return {...state, logoutLoading: false, error: null, user: null};
		case LOGOUT_USER_FAILURE:
			return {...state, error: action.error, logoutLoading: false};
		case FETCH_USERS_REQUEST:
			return {...state, fetchUsersLoading: true};
		case FETCH_USERS_SUCCESS:
			return {...state, fetchUsersLoading: false, error: null, users: action.users};
		case FETCH_USERS_FAILURE:
			return {...state, fetchUsersLoading: false, error: action.error};
		case FETCH_USER_REQUEST:
			return {...state, fetchUserLoading: true};
		case FETCH_USER_SUCCESS:
			return {...state, fetchUserLoading: false, error: null, singleUser: action.userData};
		case FETCH_USER_FAILURE:
			return {...state, fetchUserLoading: false, error: action.error};
		case DELETE_USER_FAILURE:
			return {...state, error: action.error};
		default:
			return state;
	}
};

export default usersReducer;