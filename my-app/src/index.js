import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";

// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
// 	apiKey: "AIzaSyAASt292PDZWEGmcDuuLpVbH4566YBSM9Y",
// 	authDomain: "alumni-management-system-52f7e.firebaseapp.com",
// 	projectId: "alumni-management-system-52f7e",
// 	storageBucket: "alumni-management-system-52f7e.appspot.com",
// 	messagingSenderId: "148006699798",
// 	appId: "1:148006699798:web:5f54d140ad754a3a000637",
// 	measurementId: "G-2Q94LWLZNE",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((registration) => {
				console.log("Service worker registered:", registration);
			})
			.catch((error) => {
				console.log("Service worker registration failed:", error);
			});
	});
}

// add Notification and ask for notification
Notification.requestPermission((status) => {
	console.log("status", status);
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
