import { InputAdornment, TextField } from "@mui/material/node";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { baseBackendUrl } from "../utils/baseBackendUrl";
const EmailInput = ({ emailError, setEmailError }) => {
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
					console.log(data);
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
					if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
						setEmailError("Invalid Email Address");
					} else {
						setEmailError("");
						emailChecker(e.target.value);
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
