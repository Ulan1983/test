import {TOGGLE_DRAWER} from "../actions/actionTypes";

const initialState = {
	drawerOpen: false
};

const toggleDrawerReducer = (state = initialState, action) => {
	if (action.type === TOGGLE_DRAWER) {
		return {
			...state, drawerOpen: !state.drawerOpen
		}
	}

	return state;
};

export default toggleDrawerReducer;