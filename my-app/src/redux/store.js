import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import profileReducer from "./reducers/profileReducer";

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(
	profileReducer,
	enhancer(applyMiddleware(reduxThunk))
);

export default store;
