import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { updateUserInfo } from "../redux/actions/profileActions";
import { baseBackendUrl } from "./baseBackendUrl";

const fetchUserData = async (
	sessionId,
	dispatch,
	navigate,
	setProfileFetched
) => {
	try {
		const response = await fetch(`${baseBackendUrl}/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		});

		if (response.status === 401) {
			// Redirect to login page
			RedirectToLoginNotification();
			navigate("/login");
		} else {
			const data = await response.json();
			if (data.success === true) {
				updateUserInfo(dispatch, data);
				setProfileFetched(true);
			}
		}
	} catch (error) {
		console.log("Error while fetching profile data:", error);
	}
};

export default fetchUserData;
