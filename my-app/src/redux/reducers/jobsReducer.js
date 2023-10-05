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
	UPDATE_JOB_TITLE,
	UPDATE_JOB_TYPE,
	UPDATE_MISSING_INPUTS,
	UPDATE_SELECTED_JOB_SKILLS_IDS,
	UPDATE_SELECT_JOB,
} from "../actions/types";

const initialState = {
	formData: {
		Job_Title: null,
		Description: null,
		Company_Name: null,
		Company_Logo: null,
		Company_Email: null,
		Company_Size: "1-10 employees",
		External_Link: null,
		Location: null,
		Application_Deadline: null,
		Job_Category_Id: null,
		Salary: null,
		isInternship: false,
		Duration: null,
		Job_Type: "remote",
		Education_Level: "graduate",
		Job_Skills: null,
		Job_Time: "Full-time",
		notification: true,
	},
	missingInputs: [],
	availableJobs: [],
	isJobSelect: true,
};
const initialFormData = {
	Job_Title: "",
	Description: "",
	Company_Name: "",
	Company_Logo: "",
	Company_Email: "",
	Company_Size: "1-10 employees",
	External_Link: "",
	Location: "",
	Application_Deadline: "",
	Job_Category_Id: [],
	Salary: "",
	isInternship: false,
	Duration: "",
	Job_Type: "remote",
	Education_Level: "graduate",
	Job_Skills: [],
	Job_Requirements: "",
	Job_Time: "Full-time",
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
					Job_Requirements: action.payload,
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
		case UPDATE_JOB_LOCATION:
			return {
				...state,
				formData: {
					...state.formData,
					Location: action.payload,
				},
			};
		case UPDATE_IS_INTER:
			// Determine if isInternship is true, and set Duration accordingly
			const isInternship = action.payload;
			const updatedFormData = { ...state.formData };

			if (!isInternship) {
				updatedFormData.Duration = null;
			}

			return {
				...state,
				formData: {
					...updatedFormData,
					isInternship,
				},
			};

		case CLEAR_ALL_INPUTS:
			return {
				...state,
				formData: {
					// Reset formData to its initial value
					...initialFormData,
				},
				missingInputs: [],
			};

		case UPDATE_MISSING_INPUTS:
			return {
				...state,
				missingInputs: [...action.payload],
			};

		case UPDATE_ALL_JOBS:
			return {
				...state,
				availableJobs: [...action.payload],
			};

		// User select job to see its detail
		case UPDATE_SELECT_JOB:
			return {
				...state,
				isJobSelect: action.payload,
			};
		// handle other actions and state updates here
		default:
			return state;
	}
};

export { isFieldMissing };
export default jobsReducer;
