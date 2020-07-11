import {
	CREATE_ARTICLE_FAILURE,
	DELETE_ARTICLE_FAILURE,
	EDIT_ARTICLE_FAILURE,
	FETCH_ARTICLE_FAILURE,
	FETCH_ARTICLE_REQUEST,
	FETCH_ARTICLE_SUCCESS,
	FETCH_ARTICLES_FAILURE,
	FETCH_ARTICLES_REQUEST,
	FETCH_ARTICLES_SUCCESS
} from "../actions/actionTypes";

const initialState = {
	fetchArticlesLoading: false,
	fetchArticleLoading: false,
	error: null,
	articles: [],
	article: null
};

const articlesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ARTICLES_REQUEST:
			return {...state, fetchArticlesLoading: true};
		case FETCH_ARTICLES_SUCCESS:
			return {...state, fetchArticlesLoading: false, articles: action.articles};
		case FETCH_ARTICLES_FAILURE:
			return {...state, fetchArticlesLoading: false, error: action.error};
		case FETCH_ARTICLE_REQUEST:
			return {...state, fetchArticleLoading: true};
		case FETCH_ARTICLE_SUCCESS:
			return {...state, fetchArticleLoading: false, article: action.article};
		case FETCH_ARTICLE_FAILURE:
			return {...state, fetchArticleLoading: false, error: action.error};
		case EDIT_ARTICLE_FAILURE:
			return {...state, error: action.error};
		case DELETE_ARTICLE_FAILURE:
			return {...state, error: action.error};
		case CREATE_ARTICLE_FAILURE:
			return {...state, error: action.error};
		default:
			return state;
	}
};

export default articlesReducer;