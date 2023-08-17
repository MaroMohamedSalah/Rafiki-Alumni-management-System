import {
	SET_USER_INFO,
	UPDATE_SOCIAL_URLS,
	UPDATE_USER_CV,
	UPDATE_USER_IMG,
	UPDATE_USER_INFO,
	UUPDATE_USER_IMG,
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

		// handle other actions and state updates here
		default:
			return state;
	}
};

export default profileReducer;
