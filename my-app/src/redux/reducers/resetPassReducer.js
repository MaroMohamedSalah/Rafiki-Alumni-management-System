import {
	REQUEST_PASSWORD_RESET,
	PASSWORD_RESET_LOADING,
	PASSWORD_RESET_SUCCESS,
} from "../actions/types";

const initialState = {
	isEmailSent: false,
	email: null,
	loading: false,
	success: false,
};
const resetPassReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PASSWORD_RESET:
			return {
				...state,

				...action.payload,
			};
		case PASSWORD_RESET_LOADING:
			return {
				...state,

				loading: action.payload,
			};
		case PASSWORD_RESET_SUCCESS:
			return {
				...state,

				success: action.payload,
			};

		// handle other actions and state updates here
		default:
			return state;
	}
};

export default resetPassReducer;
