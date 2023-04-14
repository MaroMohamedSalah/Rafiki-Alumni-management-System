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
const messaging = getMessaging(app);

getToken(messaging, {
	vapidKey:
		"BFQoofb1KwYIq2bS6Vc7MzyI3i01DzUkh4t6oS5PcpeQcKbMcS2rSfljg9eXYpfnnWurDdI1YBRQqwIWZFQERbM",
})
	.then((currentToken) => {
		if (currentToken) {
			console.log("FCM token:", currentToken);
		} else {
			console.log("No registration token available.");
		}
	})
	.catch((error) => {
		console.log("Error getting FCM token:", error);
	});
