import { UPDATE_JOB_CATEGORIES } from "../actions/types";

const initialState = {
	jobsCategories: [],
};
const jobsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_JOB_CATEGORIES:
			return {
				...state,

				jobsCategories: [...state.jobs.jobsCategories, ...action.payload],
			};

		// handle other actions and state updates here
		default:
			return state;
	}
};

export default jobsReducer;
