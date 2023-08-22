import { UPDATE_DASHBOARD_SIDEBAR } from "./types";

export const updateDashboardSidebar = async (dispatch, open) => {
	return dispatch({
		type: UPDATE_DASHBOARD_SIDEBAR,
		payload: open,
	});
};
