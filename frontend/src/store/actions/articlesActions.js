import {
	CREATE_ARTICLE_FAILURE,
	CREATE_ARTICLE_SUCCESS,
	DELETE_ARTICLE_FAILURE,
	DELETE_ARTICLE_SUCCESS,
	EDIT_ARTICLE_FAILURE,
	EDIT_ARTICLE_SUCCESS,
	FETCH_ARTICLE_FAILURE,
	FETCH_ARTICLE_REQUEST,
	FETCH_ARTICLE_SUCCESS,
	FETCH_ARTICLES_FAILURE,
	FETCH_ARTICLES_REQUEST,
	FETCH_ARTICLES_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";

export const fetchArticlesRequest = () => ({type: FETCH_ARTICLES_REQUEST});
export const fetchArticlesSuccess = articles => ({type: FETCH_ARTICLES_SUCCESS, articles});
export const fetchArticlesFailure = error => ({type: FETCH_ARTICLES_FAILURE, error});

export const fetchArticleRequest =() => ({type: FETCH_ARTICLE_REQUEST});
export const fetchArticleSuccess = article => ({type: FETCH_ARTICLE_SUCCESS, article});
export const fetchArticleFailure = error => ({type: FETCH_ARTICLE_FAILURE, error});

export const editArticleSuccess = () => ({type: EDIT_ARTICLE_SUCCESS});
export const editArticleFailure = error => ({type: EDIT_ARTICLE_FAILURE, error});

export const deleteArticleSuccess = () => ({type: DELETE_ARTICLE_SUCCESS});
export const deleteArticleFailure = error => ({type: DELETE_ARTICLE_FAILURE, error});

export const createArticleSuccess = () => ({type: CREATE_ARTICLE_SUCCESS});
export const createArticleFailure = error => ({type: CREATE_ARTICLE_FAILURE, error});

export const fetchArticles = category => {
	return async dispatch => {
		try {
			dispatch(fetchArticlesRequest());

			if (category) {
				const response = await axiosApi.get(`/articles?category=${category}`);
				return dispatch(fetchArticlesSuccess(response.data));
			}

			const response = await axiosApi.get('/articles');
			dispatch(fetchArticlesSuccess(response.data));
		} catch (error) {
			dispatch(fetchArticlesFailure(error.response.data));
		}
	}
};

export const fetchArticle = id => {
	return async dispatch => {
		try {
			dispatch(fetchArticleRequest());
			const response = await axiosApi.get(`/articles/${id}`);
			dispatch(fetchArticleSuccess(response.data));
		} catch (error) {
			dispatch(fetchArticleFailure(error.response.data));
		}
	}
};

export const editArticle = (id, articleData) => {
	return async dispatch => {
		try {
			await axiosApi.put(`/articles/edit/${id}`, articleData);
			dispatch(editArticleSuccess());

			toast.info('Вы успешно отредактировали статью', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
		} catch (error) {
			dispatch(editArticleFailure(error));
		}
	}
};

export const deleteArticle = id => {
	return async dispatch => {
		try {
			await axiosApi.delete(`/articles/${id}`);
			dispatch(deleteArticleSuccess());
			toast.info('Вы успешно удалили эту статью', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
		} catch (error) {
			dispatch(deleteArticleFailure(error));
		}
	}
};

export const createArticle = articleData => {
	return async dispatch => {
		try {
			await axiosApi.post('/articles', articleData);
			dispatch(createArticleSuccess());
			toast.info('Вы успешно создали статью', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
		} catch (error) {
			dispatch(createArticleFailure(error));
		}
	}
};