import { SET_PROFILE } from "./types";

export const setProfile = async (dispatch, profileData) => {
	return dispatch({
		type: SET_PROFILE,
		payload: profileData,
	});
};
