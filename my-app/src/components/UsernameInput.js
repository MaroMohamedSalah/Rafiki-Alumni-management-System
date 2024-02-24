import { InputAdornment, TextField } from "@mui/material/node";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const UsernameInput = ({
	setUsernameError,
	usernameError,
	isMain,
	setSubmitBtnContent,
}) => {
	// check if username is exist in database
	const usernameChecker = (username) => {
		const submitBtn = document.querySelector(".Auth form .submit button");
		isMain === true && submitBtn.setAttribute("disabled", true);
		fetch(`${baseBackendUrl}/users/check_user_name`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				UserName: username,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				isMain === true && submitBtn.removeAttribute("disabled");
				if (data.success === false) {
					setUsernameError(data.message);
					isMain === true && setSubmitBtnContent("Login");
				} else {
					setUsernameError("");
					isMain === true && setSubmitBtnContent("Confirm");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div className="username mb-3">
			<TextField
				id="username"
				label="Username"
				name="UserName"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircleIcon />
						</InputAdornment>
					),
				}}
				onChange={(e) => {
					const regex = /^[a-zA-Z0-9_]{3,20}$/;
					if (!regex.test(e.target.value)) {
						setUsernameError(
							"Username must be 3-20 English characters long and can only contain letters, numbers, and underscores."
						);
					} else {
						usernameChecker(e.target.value);
						setUsernameError("");
					}
				}}
				variant="outlined"
				error={usernameError !== ""}
				helperText={usernameError}
				fullWidth
			/>
		</div>
	);
};

export default UsernameInput;
