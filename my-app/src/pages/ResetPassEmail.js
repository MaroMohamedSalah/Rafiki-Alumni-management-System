import { useEffect, useState } from "react";
import forgetPassImg from "../imgs/forget-pass-img.png";
import {
	Button,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	ThemeProvider,
	createTheme,
	outlinedInputClasses,
	useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import {
	requestPasswordReset,
	updateResetPassLoading,
} from "../redux/actions/passwordResetActions";
import { useDispatch } from "react-redux";
import animationData from "../animations/animation_lmdvoyj3.json";
import Lottie from "lottie-react";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ResetPassEmail = () => {
	const [emailError, setEmailError] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [resetSuccess, setResetSuccess] = useState(
		localStorage.getItem("passwordResetSuccess")
	);

	const handelFormSubmit = async (e) => {
		e.preventDefault();
		if (emailError === "" && email !== "") {
			const form = document.querySelector(".ResetPassEmail form");

			const formData = new FormData(form);
			updateResetPassLoading(dispatch, true);

			try {
				const response = await fetch(`${baseBackendUrl}/auth/reset_password`, {
					method: "POST",
					body: JSON.stringify({
						email: formData.get("email"),
					}),
					headers: {
						"Content-Type": "application/json",
						"Demo-Code": "demo2023",
					},
				});

				if (!response.ok) {
					// Handle non-200 HTTP status codes
					if (response.status === 404) {
						setEmailError("Cant find user with this email"); // 404
						updateResetPassLoading(dispatch, false);
					} else {
						Toast({
							title: "Server Error, Please try again later",
							icon: "error",
						});
						updateResetPassLoading(dispatch, false);
						throw new Error(`Request failed with status ${response.status}`);
					}
				}

				const data = await response.json();

				if (data.success) {
					// Password reset request was successful
					const passwordResetRequest = {
						isEmailSent: true,
						email: email,
						loading: false,
						error: null,
					};
					requestPasswordReset(dispatch, passwordResetRequest);
					updateResetPassLoading(dispatch, false);
					navigate("/resetPass/checkYourEmail");
					return true;
				}
			} catch (error) {
				// Handle any network or unexpected errors
				console.error(
					"An error occurred during the password reset request:",
					error
				);
				return false;
			}
		} else if (email === "") {
			setEmailError("Can't Be Empty!");
		}
	};

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
		if (resetSuccess) {
			localStorage.setItem("passwordResetSuccess", "false");
		}
	}, []);
	return (
		<div className="ResetPassEmail pt-5">
			<div className="row">
				<div className="col-12 col-md-6 introText p-4 d-flex justify-content-center align-items-center flex-column">
					<h1 className="text-center text-md-start">Forget Password ?</h1>
					<p className="text-center text-md-start w-100">
						Dont wory. We can help.
					</p>
				</div>
				<div className="col-12 col-md-6">
					<Lottie
						loop={true}
						autoplay
						animationData={animationData}
						style={{ height: "250px" }}
						className="resetPassAnimation"
					/>
				</div>
			</div>
			<div className="form pt-5">
				<form action="#" onSubmit={handelFormSubmit}>
					<div className="">
						<ThemeProvider theme={customTheme(outerTheme)}>
							<FormControl variant="outlined" fullWidth className="email mb-3">
								<InputLabel htmlFor="outlined-end-adornment">
									Please fill in your email address
								</InputLabel>
								<OutlinedInput
									error={emailError ? true : false}
									id="outlined-end-adornment"
									type="email"
									name="email"
									onChange={(e) => {
										const emailValue = e.target.value;
										setEmail(emailValue); // Always update the email state

										if (emailValue.trim() === "") {
											// If the input is empty, clear the error message
											setEmailError("");
										} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
											// If the input is not empty and it's not a valid email, set the error
											setEmailError("Invalid Email Address");
										} else {
											// If the input is a valid email, clear the error
											setEmailError("");
										}
									}}
									endAdornment={
										<InputAdornment position="end">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="47"
												height="34"
												viewBox="0 0 47 34"
												fill="none"
											>
												<path
													d="M42.3 0C43.5465 0 44.742 0.447766 45.6234 1.2448C46.5048 2.04183 47 3.12283 47 4.25V29.75C47 30.8772 46.5048 31.9582 45.6234 32.7552C44.742 33.5522 43.5465 34 42.3 34H4.7C3.45348 34 2.25802 33.5522 1.3766 32.7552C0.495177 31.9582 0 30.8772 0 29.75V4.25C0 1.9125 2.115 0 4.7 0H42.3ZM32.0305 19.3375L47 29.75V25.5L34.968 17.2125L47 8.5V4.25L23.5 21.25L0 4.25V8.5L12.032 17.2125L0 25.5V29.75L14.9695 19.3375L23.5 25.5L32.0305 19.3375Z"
													fill="#1A4B96"
												/>
											</svg>
										</InputAdornment>
									}
									label="Please fill in your email address"
								/>
								<FormHelperText id="outlined-weight-helper-text">
									{emailError}
								</FormHelperText>
							</FormControl>
						</ThemeProvider>
					</div>
					<div className="submit text-center w-100 mt-2 mt-md-5">
						<Button variant="contained" className="w-50 px-5" type="submit">
							Send
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassEmail;
