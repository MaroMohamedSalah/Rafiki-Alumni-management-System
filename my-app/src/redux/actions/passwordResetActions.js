import { REQUEST_PASSWORD_RESET, UPDATE_PASSWORD_RESET_LOADING } from "./types";

export const requestPasswordReset = async (dispatch, passwordResetRequest) => {
	return dispatch({
		type: REQUEST_PASSWORD_RESET,
		payload: passwordResetRequest,
	});
};

export const updateResetPassLoading = async (dispatch, isLoading) => {
	return dispatch({
		type: UPDATE_PASSWORD_RESET_LOADING,
		payload: isLoading,
	});
};
