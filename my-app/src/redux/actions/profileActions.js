import { SET_USER_INFO, UPDATE_USER_INFO } from "./types";

export const setUserInfo = async (dispatch, userData) => {
	return dispatch({
		type: SET_USER_INFO,
		payload: userData,
	});
};
export const updateUserInfo = async (dispatch, userData) => {
	return dispatch({
		type: UPDATE_USER_INFO,
		payload: userData,
	});
};
