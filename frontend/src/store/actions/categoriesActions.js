import {
	DELETE_CATEGORY_FAILURE,
	DELETE_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILURE,
	EDIT_CATEGORY_SUCCESS,
	FETCH_CATEGORIES_FAILURE,
	FETCH_CATEGORIES_REQUEST,
	FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";

export const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchCategoriesFailure = error => ({type: FETCH_CATEGORIES_FAILURE, error});

export const fetchCategoryRequest =() => ({type: FETCH_CATEGORY_REQUEST});
export const fetchCategorySuccess = category => ({type: FETCH_CATEGORY_SUCCESS, category});
export const fetchCategoryFailure = error => ({type: FETCH_CATEGORY_FAILURE, error});

export const editCategorySuccess = () => ({type: EDIT_CATEGORY_SUCCESS});
export const editCategoryFailure = error => ({type: EDIT_CATEGORY_FAILURE, error});

export const deleteCategorySuccess = () => ({type: DELETE_CATEGORY_SUCCESS});
export const deleteCategoryFailure = error => ({type: DELETE_CATEGORY_FAILURE, error});

export const fetchCategories = () => {
	return async dispatch => {
		try {
			dispatch(fetchCategoriesRequest());
			const response = await axiosApi.get('/categories');
			dispatch(fetchCategoriesSuccess(response.data));
		} catch (error) {
			dispatch(fetchCategoriesFailure(error.response.data));
		}
	}
};

export const fetchCategory = id => {
	return async dispatch => {
		try {
			dispatch(fetchCategoryRequest());
			const response = await axiosApi.get(`/categories/${id}`);
			dispatch(fetchCategorySuccess(response.data));
		} catch (error) {
			dispatch(fetchCategoryFailure(error.response.data));
		}
	}
};

export const editCategory = (id, categoryData) => {
	return async dispatch => {
		try {
			await axiosApi.put(`/categories/${id}`, categoryData);
			dispatch(editCategorySuccess());
			toast.info('Вы успешно отредактировали категорию', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/categories'));
		} catch (error) {
			dispatch(editCategoryFailure(error));
		}
	}
};

export const deleteCategory = id => {
	return async dispatch => {
		try {
			await axiosApi.delete(`/categories/${id}`);
			dispatch(deleteCategorySuccess());
			toast.info('Вы успешно удалили эту категорию', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/categories'));
		} catch (error) {
			dispatch(deleteCategoryFailure(error));
		}
	}
};