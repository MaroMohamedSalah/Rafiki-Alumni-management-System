import { applyMiddleware, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import profileReducer from "./reducers/profileReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	profileReducer,
	composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
