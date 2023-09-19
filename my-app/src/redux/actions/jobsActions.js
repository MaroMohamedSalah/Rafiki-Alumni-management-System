import { UPDATE_JOB_CATEGORIES } from "./types";

export const updateJobsCategories = async (dispatch, categories) => {
	return dispatch({
		type: UPDATE_JOB_CATEGORIES,
		payload: categories,
	});
};
