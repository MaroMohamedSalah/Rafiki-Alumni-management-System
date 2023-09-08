import {
	REQUEST_PASSWORD_RESET,
	UPDATE_PASSWORD_RESET_LOADING,
} from "../actions/types";

const initialState = {
	isEmailSent: false,
	email: null,
	loading: false,
	error: null,
};
const resetPassReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PASSWORD_RESET:
			return {
				...state,

				...action.payload,
			};
		case UPDATE_PASSWORD_RESET_LOADING:
			return {
				...state,

				loading: action.payload,
			};

		// handle other actions and state updates here
		default:
			return state;
	}
};

export default resetPassReducer;
