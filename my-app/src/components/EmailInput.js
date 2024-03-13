import { InputAdornment, TextField } from "@mui/material/node";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { baseBackendUrl } from "../utils/baseBackendUrl";
const EmailInput = ({ emailError, setEmailError, actor }) => {
	const emailChecker = (emailV) => {
		fetch(`${baseBackendUrl}/users/check_email`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				Email: emailV,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success === false) {
					// yes -> Email is exist in our database
					setEmailError(data.message);
				} else {
					setEmailError("");
				}
			})
			.catch((error) => console.error("Error:", error));
	};
	return (
		<div className="email mb-3">
			<TextField
				type="email"
				id="email"
				name="Email"
				label="Email"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AlternateEmailIcon />
						</InputAdornment>
					),
				}}
				onChange={(e) => {
					const emailInputValue = e.target.value;
					const studentEmailRegex =
						/\b[A-Za-z0-9._%+-]+@fci\.helwan\.edu\.eg\b/;
					if (actor === "student" && !studentEmailRegex.test(emailInputValue)) {
						setEmailError("Enter your Collage Email Address");
					} else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailInputValue)) {
						console.log("email");
						setEmailError("Invalid Email Address");
					} else {
						setEmailError("");
						emailChecker(emailInputValue);
					}
				}}
				variant="outlined"
				error={emailError !== ""}
				helperText={emailError}
				fullWidth
			/>
		</div>
	);
};

export default EmailInput;
