import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Lottie from "lottie-react";
import animationData from "../animations/animation_lmdpdj37.json";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/node/styles";
import {
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material/node";
import { outlinedInputClasses } from "@mui/material/node/OutlinedInput";
import { useTheme } from "@mui/material";
import Toast from "../components/Toast";
import {
	updateResetPassLoading,
	updateResetPassStatus,
} from "../redux/actions/passwordResetActions";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const CreateNewPass = () => {
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [resetSuccess, setResetSuccess] = useState(
		localStorage.getItem("passwordResetSuccess")
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useParams();
	function validatePassword(password) {
		// Define the password complexity rules
		const minLength = 8;
		const hasUppercase = /[A-Z]/.test(password);
		const hasLowercase = /[a-z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		// Perform the validation
		if (password.length === 0) {
			setPasswordError("");
		} else if (password.length < minLength) {
			setPasswordError("Password must be at least 8 characters long");
		} else if (
			!hasUppercase ||
			!hasLowercase ||
			!hasNumber ||
			!hasSpecialChar
		) {
			setPasswordError(
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			);
		} else {
			setPassword(password);
			setPasswordError("");
		}

		// Password meets complexity requirements
		return null;
	}
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handelSubmit = async (e) => {
		e.preventDefault();
		const url = `${baseBackendUrl}/auth/reset_password/${token}`;
		if (confirmPassword !== "" && password !== "") {
			updateResetPassLoading(dispatch, true);
			try {
				const response = await fetch(url, {
					method: "POST",
					body: JSON.stringify({
						password: confirmPassword,
					}),
					headers: {
						"Content-Type": "application/json",
						"Demo-Code": "demo2023",
					},
				});

				if (!response.ok) {
					// Handle non-200 HTTP status codes
					updateResetPassLoading(dispatch, false);
					if (response.status === 404) {
						Toast({
							title: "Token Expired. Please request a new link.",
							icon: "error",
						});
						navigate("/resetPass");
					} else {
						Toast({ title: "server error", icon: "error" });
					}
					throw new Error(`Request failed with status ${response.status}`);
				}

				const data = await response.json();

				if (data.success) {
					// Password reset was successful
					updateResetPassLoading(dispatch, false);
					updateResetPassStatus(dispatch, true);
					localStorage.setItem("passwordResetSuccess", "true");
					navigate("/resetPass/createNewPasswordSuccess");
					return true;
				} else {
					Toast({ title: data.message, icon: "error" });
					updateResetPassLoading(dispatch, false);
				}
			} catch (error) {
				// Handle any network or unexpected errors
				updateResetPassLoading(dispatch, false);
				console.error(
					"An error occurred during the create new password request:",
					error
				);
				return false;
			}
		} else if (confirmPassword === "") {
			setConfirmPasswordError("Can't Be Empty");
			Toast({ title: "Fix All Felids Error Please", icon: "error" });
		} else {
			setPasswordError("Can't Be Empty");
			Toast({ title: "Fix All Felids Error Please", icon: "error" });
		}
	};
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const customTheme = (outerTheme) =>
		createTheme({
			palette: {
				mode: outerTheme.palette.mode,
			},
			components: {
				MuiOutlinedInput: {
					styleOverrides: {
						notchedOutline: {
							borderColor: "var(--primary-color)",
							borderRadius: "var(--main-border-radius)",
						},
						root: {
							[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
								borderColor: "#388ba6",
							},
							[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
								borderColor: "var(--primary-color)",
							},
						},
					},
				},
			},
		});
	const outerTheme = useTheme();
	useEffect(() => {
		if (resetSuccess === "true") {
			navigate("/Login");
		}
	}, []);
	return (
		<div className="CreateNewPass pt-5">
			<div className="row">
				<div className="col-12 col-md-6 introText p-4 d-flex justify-content-center align-items-center flex-column">
					<h1 className="text-center text-md-start">Create New Password</h1>
					<p className="text-center text-md-start w-100">
						Here's a tip: Use a combination of Numbers, Uppercase, lowercase and
						Special characters
					</p>
				</div>
				<div className="col-12 col-md-6">
					<Lottie
						loop={true}
						autoplay
						animationData={animationData}
						style={{ height: "190px" }}
						className="resetPassAnimation"
					/>
				</div>
			</div>
			<form action="#" onSubmit={handelSubmit}>
				<div className="">
					<ThemeProvider theme={customTheme(outerTheme)}>
						<FormControl variant="outlined" fullWidth className="email mb-3">
							<InputLabel htmlFor="outlined-adornment-password">
								New password
							</InputLabel>
							<OutlinedInput
								error={passwordError ? true : false}
								id="outlined-adornment-password"
								type={showPassword ? "text" : "password"}
								name="password"
								onChange={(e) => {
									const passValue = e.target.value;
									validatePassword(passValue);
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="New Password"
							/>
							<FormHelperText id="outlined-weight-helper-text">
								{passwordError}
							</FormHelperText>
						</FormControl>

						<FormControl variant="outlined" fullWidth className="email mb-3">
							<InputLabel htmlFor="outlined-adornment-confirm-password">
								Confirm New password
							</InputLabel>
							<OutlinedInput
								error={confirmPasswordError ? true : false}
								id="outlined-adornment-confirm-password"
								type="password"
								name="password"
								onChange={(e) => {
									const confirmPassValue = e.target.value;
									if (confirmPassValue !== password) {
										setConfirmPasswordError(
											"Password And Confirm Password Must Be The Same"
										);
									} else {
										setConfirmPasswordError("");
										setConfirmPassword(confirmPassValue);
									}
								}}
								label="Confirm New Password"
							/>
							<FormHelperText id="outlined-weight-helper-text">
								{confirmPasswordError}
							</FormHelperText>
						</FormControl>
					</ThemeProvider>
				</div>
				<div className="submit text-center w-100 mt-5">
					<Button variant="contained" className="w-50 px-5" type="submit">
						Reset Password
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateNewPass;
