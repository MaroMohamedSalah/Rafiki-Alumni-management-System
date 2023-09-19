import { combineReducers } from "redux";
import dashboardReducer from "./dashboardReducer";
import profileReducer from "./profileReducer";
import resetPassReducer from "./resetPassReducer";
import jobsReducer from "./jobsReducer";

const rootReducer = combineReducers({
	dashboard: dashboardReducer,
	profile: profileReducer,
	passwordReset: resetPassReducer,
	jobs: jobsReducer,
});

export default rootReducer;
