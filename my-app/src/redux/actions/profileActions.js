import {
	DELETE_USER_PHONE,
	DELETE_USER_SKILL,
	DELETE_SOCIAL_URL,
	DELETE_USER_IMG,
	SET_USER_INFO,
	UPDATE_SOCIAL_URLS,
	UPDATE_USER_ABOUT,
	UPDATE_USER_COUNTRY,
	UPDATE_USER_CV,
	UPDATE_USER_IMG,
	UPDATE_USER_INFO,
	UPDATE_USER_PHONE,
	UPDATE_USER_SKILLS,
	DELETE_USER_CV,
	DELETE_USER_ABOUT,
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
export const updateProfileCV = async (dispatch, newCV) => {
	return dispatch({
		type: UPDATE_USER_CV,
		payload: newCV,
	});
};
export const updateProfileAbout = async (dispatch, newAbout) => {
	return dispatch({
		type: UPDATE_USER_ABOUT,
		payload: newAbout,
	});
};
export const updateProfileCountry = async (dispatch, newCountry) => {
	return dispatch({
		type: UPDATE_USER_COUNTRY,
		payload: newCountry,
	});
};
export const updateProfilePhone = async (dispatch, newNum) => {
	return dispatch({
		type: UPDATE_USER_PHONE,
		payload: newNum,
	});
};
export const updateProfileSkills = async (dispatch, newSkills) => {
	return dispatch({
		type: UPDATE_USER_SKILLS,
		payload: newSkills,
	});
};

export const deleteSocialURL = async (dispatch, urlType) => {
	return dispatch({
		type: DELETE_SOCIAL_URL,
		payload: urlType,
	});
};
export const deleteUserImg = async (dispatch) => {
	return dispatch({
		type: DELETE_USER_IMG,
	});
};
export const deleteUserCv = async (dispatch) => {
	return dispatch({
		type: DELETE_USER_CV,
	});
};
export const deletePhone = async (dispatch) => {
	return dispatch({
		type: DELETE_USER_PHONE,
	});
};
export const deleteSkill = async (dispatch, userSkillId) => {
	return dispatch({
		type: DELETE_USER_SKILL,
		payload: userSkillId,
	});
};
export const deleteAbout = async (dispatch) => {
	return dispatch({
		type: DELETE_USER_ABOUT,
	});
};
