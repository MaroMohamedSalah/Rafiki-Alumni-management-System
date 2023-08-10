import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { updateUserInfo } from "../redux/actions/profileActions";

const fetchUserData = async (
	sessionId,
	dispatch,
	navigate,
	setProfileFetched
) => {
	try {
		const response = await fetch(
			"https://alumni-system-backend.azurewebsites.net/api/users",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			}
		);

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
