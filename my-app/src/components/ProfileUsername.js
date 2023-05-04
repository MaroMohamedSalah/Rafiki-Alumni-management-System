import axios from "axios";
import { useState, useEffect } from "react";

const ProfileUsername = () => {
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
	}, []);

	return username.length === 0 ? (
		<p class="placeholder-glow w-100 text-center text-md-start">
			@<span class="placeholder w-25"></span>
		</p>
	) : (
		<h5 className="text-center text-md-start">@{username}</h5>
	);
};

export default ProfileUsername;
