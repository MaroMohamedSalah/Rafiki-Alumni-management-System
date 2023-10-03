import {
	CLEAR_ALL_INPUTS,
	UPDATE_ALL_JOBS,
	UPDATE_IS_INTER,
	UPDATE_JOB_CATEGORY,
	UPDATE_JOB_COMPANY_EMAIL,
	UPDATE_JOB_COMPANY_LOGO,
	UPDATE_JOB_COMPANY_NAME,
	UPDATE_JOB_COMPANY_SIZE,
	UPDATE_JOB_DEADLINE,
	UPDATE_JOB_DESCRIPTION,
	UPDATE_JOB_DURATION,
	UPDATE_JOB_EDUCATION_LEVEL,
	UPDATE_JOB_EXTERNAL_LINK,
	UPDATE_JOB_LOCATION,
	UPDATE_JOB_REQUIREMENT,
	UPDATE_JOB_SALARY,
	UPDATE_JOB_TIME,
	UPDATE_JOB_TITLE,
	UPDATE_JOB_TYPE,
	UPDATE_MISSING_INPUTS,
	UPDATE_SELECTED_JOB_SKILLS_IDS,
	UPDATE_SELECT_JOB,
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
export const updateJobCompanyName = async (dispatch, name) => {
	return dispatch({
		type: UPDATE_JOB_COMPANY_NAME,
		payload: name,
	});
};
export const updateJobCompanyLogo = async (dispatch, link) => {
	return dispatch({
		type: UPDATE_JOB_COMPANY_LOGO,
		payload: link,
	});
};
export const updateJobCompanySize = async (dispatch, size) => {
	return dispatch({
		type: UPDATE_JOB_COMPANY_SIZE,
		payload: size,
	});
};
export const updateJobSalary = async (dispatch, salary) => {
	return dispatch({
		type: UPDATE_JOB_SALARY,
		payload: +salary,
	});
};
export const updateJobDescription = async (dispatch, description) => {
	return dispatch({
		type: UPDATE_JOB_DESCRIPTION,
		payload: description,
	});
};
export const updateJobRequirements = async (dispatch, req) => {
	return dispatch({
		type: UPDATE_JOB_REQUIREMENT,
		payload: req,
	});
};
export const updateJobSkillIds = (dispatch, selectedIds) => {
	return dispatch({
		type: UPDATE_SELECTED_JOB_SKILLS_IDS,
		payload: selectedIds,
	});
};

export const updateJobDeadline = (dispatch, deadline) => {
	return dispatch({
		type: UPDATE_JOB_DEADLINE,
		payload: deadline,
	});
};

export const updateJobExternalLink = (dispatch, link) => {
	return dispatch({
		type: UPDATE_JOB_EXTERNAL_LINK,
		payload: link,
	});
};

export const updateJobCompanyEmail = (dispatch, email) => {
	return dispatch({
		type: UPDATE_JOB_COMPANY_EMAIL,
		payload: email,
	});
};
export const updateJobLocation = (dispatch, location) => {
	return dispatch({
		type: UPDATE_JOB_LOCATION,
		payload: location,
	});
};
export const updateJobDuration = (dispatch, duration) => {
	return dispatch({
		type: UPDATE_JOB_DURATION,
		payload: +duration,
	});
};
export const updateJobTime = (dispatch, jobTime) => {
	return dispatch({
		type: UPDATE_JOB_TIME,
		payload: jobTime,
	});
};

export const updateMissingInput = async (dispatch, missingInputArray) => {
	return dispatch({
		type: UPDATE_MISSING_INPUTS,
		payload: missingInputArray,
	});
};
export const updateIsIntern = async (dispatch, isIntern) => {
	return dispatch({
		type: UPDATE_IS_INTER,
		payload: isIntern,
	});
};
export const clearAllJobInputs = async (dispatch) => {
	return dispatch({
		type: CLEAR_ALL_INPUTS,
	});
};

export const updateAllJobs = async (dispatch, jobs) => {
	return dispatch({
		type: UPDATE_ALL_JOBS,
		payload: jobs,
	});
};

export const handelSelectJobToSeeDetail = async (dispatch, status) => {
	return dispatch({
		type: UPDATE_SELECT_JOB,
		payload: status,
	});
};
