import { SET_USER_INFO, UPDATE_USER_INFO } from "../actions/types";

const initialState = {
	userInfo: null,
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};
		case UPDATE_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};
		// handle other actions and state updates here
		default:
			return state;
	}
};

export default profileReducer;
