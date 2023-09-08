import { combineReducers } from "redux";
import dashboardReducer from "./dashboardReducer";
import profileReducer from "./profileReducer";
import resetPassReducer from "./resetPassReducer";

const rootReducer = combineReducers({
	dashboard: dashboardReducer,
	profile: profileReducer,
	resetPass: resetPassReducer,
});

export default rootReducer;
