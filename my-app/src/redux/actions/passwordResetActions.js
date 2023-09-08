import { REQUEST_PASSWORD_RESET } from "./types";

export const requestPasswordReset = async (dispatch, email) => {
	return dispatch({
		type: REQUEST_PASSWORD_RESET,
		payload: email,
	});
};
