import show from "../imgs/show password.svg";
import hide from "../imgs/hide password.svg";
import icon5 from "../imgs/sign up 5.svg";
import icon6 from "../imgs/sign up 6.svg";
import { useState } from "react";
const PasswordInput = ({
	passwordError,
	setPasswordError,
	confirmPasswordError,
	setConfirmPasswordError,
	setConfirmPass,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");

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
				<div className="input-group p-2">
					<span className="input-group-text" id="basic-addon1">
						<img src={icon5} alt="" />
					</span>
					<input
						name="password"
						id="password"
						type={showPassword === true ? "text" : "password"}
						className="form-control"
						placeholder="Password"
						aria-label="Password"
						aria-describedby="basic-addon1"
						onChange={(e) => {
							if (validatePassword(e.target.value) === null) {
								setPasswordError("");
								setPassword(e.target.value);
							} else {
								setPasswordError(validatePassword(e.target.value));
							}
						}}
					/>
					<span className="input-group-text" id="basic-addon1">
						{showPassword === true ? (
							<img src={hide} alt="" onClick={() => setShowPassword(false)} />
						) : (
							<img src={show} alt="" onClick={() => setShowPassword(true)} />
						)}
					</span>
				</div>
				<h5 className="error">{passwordError}</h5>
			</div>
			<div className="confirm mb-3">
				<div className="input-group p-2">
					<span className="input-group-text" id="basic-addon1">
						<img src={icon6} alt="" />
					</span>
					<input
						id="confirm"
						type="password"
						className="form-control"
						placeholder="Confirm Password"
						aria-label="Confirm Password"
						aria-describedby="basic-addon1"
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
					/>
				</div>
				<h5 className="error">{confirmPasswordError}</h5>
			</div>
		</>
	);
};

export default PasswordInput;
