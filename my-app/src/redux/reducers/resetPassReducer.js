import { REQUEST_PASSWORD_RESET } from "../actions/types";

const initialState = {
	passwordReset: {
		email: null,
		loading: false,
		error: null,
	},
};
const resetPassReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PASSWORD_RESET:
			return {
				...state,

				passwordReset: {
					...state.passwordReset,
					email: action.payload,
				},
			};

		// handle other actions and state updates here
		default:
			return state;
	}
};

export default resetPassReducer;
