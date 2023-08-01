import { SET_PROFILE } from "../actions/types";

const initialState = {
	profile: null,
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROFILE:
			return {
				...state,
				profile: action.payload,
			};
		// handle other actions and state updates here
		default:
			return state;
	}
};

export default profileReducer;