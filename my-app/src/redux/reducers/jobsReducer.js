import {
	UPDATE_JOB_CATEGORY,
	UPDATE_JOB_EDUCATION_LEVEL,
	UPDATE_JOB_TITLE,
	UPDATE_JOB_TYPE,
	UPDATE_MISSING_INPUTS,
} from "../actions/types";

const initialState = {
	formData: {
		Job_Title: null,
		Description: null,
		Company_Name: null,
		Company_Logo: null,
		Contact_Info: "test",
		Company_Email: "test",
		Company_Size: null,
		External_Link: null,
		Location: null,
		Application_Deadline: null,
		Job_Category_Id: null,
		Salary: null,
		isInternship: null,
		Duration: null,
		Job_Type: null,
		Education_Level: null,
		Job_Skills: null,
	},
	missingInputs: [],
};
const isFieldMissing = (state, fieldName) =>
	state.missingInputs.includes(fieldName);
const jobsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_JOB_TITLE:
			return {
				...state,
				formData: {
					...state.formData,
					Job_Title: action.payload,
				},
			};
		case UPDATE_JOB_TYPE:
			return {
				...state,
				formData: {
					...state.formData,
					Job_Type: action.payload,
				},
			};
		case UPDATE_JOB_CATEGORY:
			return {
				...state,
				formData: {
					...state.formData,
					Job_Category_Id: action.payload,
				},
			};
		case UPDATE_JOB_EDUCATION_LEVEL:
			return {
				...state,
				formData: {
					...state.formData,
					Education_Level: action.payload,
				},
			};
		case UPDATE_MISSING_INPUTS:
			return {
				...state,
				missingInputs: [...action.payload],
			};

		// handle other actions and state updates here
		default:
			return state;
	}
};
export { isFieldMissing };
export default jobsReducer;
