import {
	REQUEST_PASSWORD_RESET,
	PASSWORD_RESET_LOADING,
	PASSWORD_RESET_SUCCESS,
} from "./types";

export const requestPasswordReset = async (dispatch, passwordResetRequest) => {
	return dispatch({
		type: REQUEST_PASSWORD_RESET,
		payload: passwordResetRequest,
	});
};

export const updateResetPassLoading = async (dispatch, isLoading) => {
	return dispatch({
		type: PASSWORD_RESET_LOADING,
		payload: isLoading,
	});
};

export const updateResetPassStatus = async (dispatch, success) => {
	return dispatch({
		type: PASSWORD_RESET_SUCCESS,
		payload: success,
	});
};
