import {
	SET_USER_INFO,
	UPDATE_SOCIAL_URLS,
	UPDATE_USER_IMG,
	UPDATE_USER_INFO,
} from "./types";

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
export const updateSocialURLs = async (dispatch, newURL) => {
	return dispatch({
		type: UPDATE_SOCIAL_URLS,
		payload: newURL,
	});
};
export const updateProfileImg = async (dispatch, newImg) => {
	return dispatch({
		type: UPDATE_USER_IMG,
		payload: newImg,
	});
};
