import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";
import CheckIcon from "@mui/icons-material/Check";
import icon6 from "../imgs/sign up 6.svg";
import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material/node";
const PasswordInput = ({
	passwordError,
	setPasswordError,
	confirmPasswordError,
	setConfirmPasswordError,
	setConfirmPass,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	function validatePassword(password) {
		// Define the password complexity rules
		const minLength = 8;
		const hasUppercase = /[A-Z]/.test(password);
		const hasLowercase = /[a-z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		// Perform the validation
		if (password.length < minLength) {
			return "Password must be at least 8 characters long";
		}
		if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
			return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
		}

		// Password meets complexity requirements
		return null;
	}
	return (
		<>
			<div className="password mb-3">
				<TextField
					id="password"
					label="Password"
					type={showPassword === true ? "text" : "password"}
					name="Password"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<PasswordIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? (
										<VisibilityOff fontSize="small" />
									) : (
										<Visibility fontSize="small" />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
					onChange={(e) => {
						if (validatePassword(e.target.value) === null) {
							setPasswordError("");
							setPassword(e.target.value);
						} else {
							setPasswordError(validatePassword(e.target.value));
						}
					}}
					onCopy={(e) => e.preventDefault()}
					variant="outlined"
					error={passwordError !== ""}
					helperText={passwordError}
					fullWidth
				/>
			</div>
			<div className="confirm mb-3">
				<TextField
					id="confirm"
					label="Confirm Password"
					type="password"
					name="conPassword"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<CheckIcon />
							</InputAdornment>
						),
					}}
					onChange={(e) => {
						setConfirmPass(e.target.value);
						if (e.target.value === password) {
							setConfirmPasswordError("");
						} else {
							setConfirmPasswordError(
								"Password and Confirm Password must be the same"
							);
						}
					}}
					onCopy={(e) => e.preventDefault()}
					variant="outlined"
					error={confirmPasswordError !== ""}
					helperText={confirmPasswordError}
					fullWidth
				/>
			</div>
		</>
	);
};

export default PasswordInput;
