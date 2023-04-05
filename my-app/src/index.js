import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// oneSignal
import { OneSignalProvider } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
	<React.StrictMode>
		<OneSignalProvider appId="8b907f94-4d57-4b6e-830e-0d6ee2c0ea7a">
			<App />
		</OneSignalProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
