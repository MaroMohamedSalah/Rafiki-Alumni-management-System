import axios from "axios";
import { useState, useEffect } from "react";

const ProfileUsername = ({ userID }) => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		axios
			.get(
				`https://alumnimanagmentsys12.000webhostapp.com/APIs/get_username.php?user_id=${localStorage.getItem(
					"UserID"
				)}`
			)
			.then((response) => {
				setUsername(response.data.user_name);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [userID]);

	return username.length === 0 ? (
		<p class="placeholder-glow w-50">
			@<span class="placeholder w-50"></span>
		</p>
	) : (
		<h5>@{username}</h5>
	);
};

export default ProfileUsername;
