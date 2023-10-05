import { UPDATE_DASHBOARD_SIDEBAR } from "../actions/types";

const initialState = {
	sidebar: {
		sideBarIsOpen: false,
	},
};
const dashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_DASHBOARD_SIDEBAR:
			return {
				...state,

				sidebar: {
					...state.sidebar,
					sideBarIsOpen: action.payload,
				},
			};

		// handle other actions and state updates here
		default:
			return state;
	}
};

export default dashboardReducer;
