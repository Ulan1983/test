import {
	DELETE_CATEGORY_FAILURE,
	EDIT_CATEGORY_FAILURE,
	FETCH_CATEGORIES_FAILURE,
	FETCH_CATEGORIES_REQUEST,
	FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS
} from "../actions/actionTypes";

const initialState = {
	fetchCategoriesLoading: false,
	fetchCategoryLoading: false,
	error: null,
	categories: [],
	category: null
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES_REQUEST:
			return {...state, fetchCategoriesLoading: true};
		case FETCH_CATEGORIES_SUCCESS:
			return {...state, fetchCategoriesLoading: false, categories: action.categories};
		case FETCH_CATEGORIES_FAILURE:
			return {...state, fetchCategoriesLoading: false, error: action.error};
		case FETCH_CATEGORY_REQUEST:
			return {...state, fetchCategoryLoading: true};
		case FETCH_CATEGORY_SUCCESS:
			return {...state, fetchCategoryLoading: false, category: action.category};
		case FETCH_CATEGORY_FAILURE:
			return {...state, fetchCategoryLoading: false, error: action.error};
		case EDIT_CATEGORY_FAILURE:
			return {...state, error: action.error};
		case DELETE_CATEGORY_FAILURE:
			return {...state, error: action.error};
		default:
			return state;
	}
};

export default categoriesReducer;