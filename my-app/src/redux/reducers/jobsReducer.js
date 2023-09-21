import {
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
	UPDATE_JOB_REQUIREMENT,
	UPDATE_JOB_SALARY,
	UPDATE_JOB_TITLE,
	UPDATE_JOB_TYPE,
	UPDATE_MISSING_INPUTS,
	UPDATE_SELECTED_JOB_SKILLS_IDS,
} from "../actions/types";

const initialState = {
	formData: {
		Job_Title: null,
		Description: null,
		Company_Name: null,
		Company_Logo: null,
		Contact_Info: "test",
		Company_Email: null,
		Company_Size: "1-10 employees",
		External_Link: null,
		Location: null,
		Application_Deadline: null,
		Job_Category_Id: null,
		Salary: null,
		isInternship: null,
		Duration: null,
		Job_Type: "remote",
		Education_Level: "graduate",
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
		case UPDATE_JOB_COMPANY_NAME:
			return {
				...state,
				formData: {
					...state.formData,
					Company_Name: action.payload,
				},
			};
		case UPDATE_JOB_COMPANY_LOGO:
			return {
				...state,
				formData: {
					...state.formData,
					Company_Logo: action.payload,
				},
			};
		case UPDATE_JOB_COMPANY_SIZE:
			return {
				...state,
				formData: {
					...state.formData,
					Company_Size: action.payload,
				},
			};
		case UPDATE_JOB_SALARY:
			return {
				...state,
				formData: {
					...state.formData,
					Salary: action.payload,
				},
			};
		case UPDATE_JOB_DESCRIPTION:
			return {
				...state,
				formData: {
					...state.formData,
					Description: action.payload,
				},
			};
		case UPDATE_JOB_REQUIREMENT:
			return {
				...state,
				formData: {
					...state.formData,
					Requirements: action.payload,
				},
			};
		case UPDATE_SELECTED_JOB_SKILLS_IDS:
			return {
				...state,
				formData: {
					...state.formData,
					Job_Skills: action.payload,
				},
			};
		case UPDATE_JOB_DEADLINE:
			return {
				...state,
				formData: {
					...state.formData,
					Application_Deadline: action.payload,
				},
			};
		case UPDATE_JOB_EXTERNAL_LINK:
			return {
				...state,
				formData: {
					...state.formData,
					External_Link: action.payload,
				},
			};
		case UPDATE_JOB_COMPANY_EMAIL:
			return {
				...state,
				formData: {
					...state.formData,
					Company_Email: action.payload,
				},
			};
		case UPDATE_JOB_DURATION:
			return {
				...state,
				formData: {
					...state.formData,
					Duration: action.payload,
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
