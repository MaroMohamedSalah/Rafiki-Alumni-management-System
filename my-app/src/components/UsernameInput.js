import React, { useState } from "react";
import icon3 from "../imgs/sign up 3.svg";

const UsernameInput = ({ setUsernameError, usernameError }) => {
	const usernameChecker = (username) => {
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/check_username.php",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					username: username,
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.error === true) {
					setUsernameError(data.message);
				} else {
					setUsernameError("");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div className="username mb-3">
			<div className="input-group p-2">
				<span className="input-group-text" id="basic-addon1">
					<img src={icon3} alt="" />
				</span>
				<input
					name="username"
					id="username"
					type="text"
					className="form-control"
					placeholder="Username"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onChange={(e) => {
						const regex = /^[a-zA-Z0-9_]{3,20}$/;
						if (!regex.test(e.target.value)) {
							setUsernameError(
								"Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
							);
						} else {
							usernameChecker(e.target.value);
							setUsernameError("");
						}
					}}
				/>
			</div>
			<h5 className="error">{usernameError}</h5>
		</div>
	);
};

export default UsernameInput;
