import { combineReducers } from "redux";
import dashboardReducer from "./dashboardReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
	dashboard: dashboardReducer,
	profile: profileReducer,
});

export default rootReducer;
