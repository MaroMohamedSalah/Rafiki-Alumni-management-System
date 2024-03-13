import {
	DELETE_USER_PHONE,
	DELETE_USER_SKILL,
	DELETE_SOCIAL_URL,
	DELETE_USER_IMG,
	SET_USER_INFO,
	UPDATE_SOCIAL_URLS,
	UPDATE_USER_ABOUT,
	UPDATE_USER_CV,
	UPDATE_USER_IMG,
	UPDATE_USER_INFO,
	UPDATE_USER_PHONE,
	UPDATE_USER_SKILLS,
	DELETE_USER_CV,
	DELETE_USER_ABOUT,
} from "../actions/types";

const initialState = {
	userInfo: null,
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};
		case UPDATE_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};
		case UPDATE_USER_IMG:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						Img: action.payload,
					},
				},
			};
		case UPDATE_SOCIAL_URLS:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						...action.payload,
					},
				},
			};
		case UPDATE_USER_CV:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						CV: action.payload,
					},
				},
			};
		case UPDATE_USER_ABOUT:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						About: action.payload,
					},
				},
			};
		case UPDATE_USER_PHONE:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						Phone: action.payload,
					},
				},
			};
		case UPDATE_USER_SKILLS:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						UserSkills: action.payload,
					},
				},
			};
		case DELETE_SOCIAL_URL:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						[action.payload]: null,
					},
				},
			};
		case DELETE_USER_IMG:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						Img: null,
					},
				},
			};
		case DELETE_USER_CV:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						CV: null,
					},
				},
			};
		case DELETE_USER_PHONE:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						Phone: null,
					},
				},
			};
		case DELETE_USER_SKILL:
			const skillIdToDelete = action.payload;
			const updatedUserSkills = state.userInfo.user.UserSkills.filter(
				(skill) => skill.id !== skillIdToDelete
			);

			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						UserSkills: updatedUserSkills, // Update UserSkills array without the deleted skill
					},
				},
			};

		case DELETE_USER_ABOUT:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					user: {
						...state.userInfo.user,
						About: null,
					},
				},
			};
		// handle other actions and state updates here
		default:
			return state;
	}
};

export default profileReducer;
