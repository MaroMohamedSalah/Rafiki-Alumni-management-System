import {
	UPDATE_JOB_CATEGORY,
	UPDATE_JOB_EDUCATION_LEVEL,
	UPDATE_JOB_TITLE,
	UPDATE_JOB_TYPE,
	UPDATE_MISSING_INPUTS,
} from "./types";

export const updateJobTitle = async (dispatch, jobTitle) => {
	return dispatch({
		type: UPDATE_JOB_TITLE,
		payload: jobTitle,
	});
};
export const updateJobType = async (dispatch, jobType) => {
	return dispatch({
		type: UPDATE_JOB_TYPE,
		payload: jobType,
	});
};
export const updateJobCategory = async (dispatch, jobCategoryId) => {
	return dispatch({
		type: UPDATE_JOB_CATEGORY,
		payload: jobCategoryId,
	});
};
export const updateJobEduLevel = async (dispatch, eduLevel) => {
	return dispatch({
		type: UPDATE_JOB_EDUCATION_LEVEL,
		payload: eduLevel,
	});
};

export const updateMissingInput = async (dispatch, missingInputArray) => {
	return dispatch({
		type: UPDATE_MISSING_INPUTS,
		payload: missingInputArray,
	});
};
