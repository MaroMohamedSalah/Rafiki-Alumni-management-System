import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyAASt292PDZWEGmcDuuLpVbH4566YBSM9Y",
	authDomain: "alumni-management-system-52f7e.firebaseapp.com",
	projectId: "alumni-management-system-52f7e",
	storageBucket: "alumni-management-system-52f7e.appspot.com",
	messagingSenderId: "148006699798",
	appId: "1:148006699798:web:5f54d140ad754a3a000637",
	measurementId: "G-2Q94LWLZNE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
	vapidKey:
		"BFQoofb1KwYIq2bS6Vc7MzyI3i01DzUkh4t6oS5PcpeQcKbMcS2rSfljg9eXYpfnnWurDdI1YBRQqwIWZFQERbM",
})
	.then((currentToken) => {
		if (currentToken) {
			// Send the token to your server and update the UI if necessary
			// ...
		} else {
			// Show permission request UI
			console.log(
				"No registration token available. Request permission to generate one."
			);
			// ...
		}
	})
	.catch((err) => {
		console.log("An error occurred while retrieving token. ", err);
		// ...
	});

function App() {
	return (
		<div className="App">
			<h1>Push Notification Demo</h1>
		</div>
	);
}

export default App;
