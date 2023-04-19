import React, { useState, useEffect } from "react";
import "./Auth.css";
import ProgressLine from "../components/ProgressLine";
import Backbtn from "../components/Backbtn";
import alumniImg from "../imgs/Alumni img 2.svg";
import icon1 from "../imgs/sign up 1.svg";
import icon3 from "../imgs/sign up 3.svg";
import icon4 from "../imgs/sign up 4.svg";
import icon5 from "../imgs/sign up 5.svg";
import icon6 from "../imgs/sign up 6.svg";
import show from "../imgs/show password.svg";
import hide from "../imgs/hide password.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AlumniSignup = () => {
	const [submitBtnContent, setSubmitBtnContent] = useState("Confirm");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate(); // Get navigate function from react-router-dom

	// Define state variables for error messages
	const [nationalIDError, setNationalIDError] = useState();
	const [usernameError, setUsernameError] = useState();
	const [emailError, setEmailError] = useState();
	const [passwordError, setPasswordError] = useState();
	const [confirmPasswordError, setConfirmPasswordError] = useState();

	const usernameChecker = (usernameV) => {
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/check_username.php",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					username: usernameV,
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.error === true) {
					// yes -> username is exist in our database
					console.log(data);
					setUsernameError(data.message);
				} else {
					setUsernameError("");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	const emailChecker = (emailV) => {
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/check_email.php",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					email: emailV,
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.error === true) {
					// yes -> Email is exist in our database
					console.log(data);
					setEmailError(data.message);
				} else {
					setEmailError("");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	// check if national id is exist in database
	const NIDchecker = (national_ID) => {
		const submitBtn = document.querySelector(".Auth form .submit button");
		submitBtn.setAttribute("disabled", true);
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/check_national_id.php",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					NID: national_ID,
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				submitBtn.removeAttribute("disabled");
				if (data.error === true) {
					// yes -> national ID is exist in our database
					console.log(data);
					// setIsNIDexist(true);
					setNationalIDError(data.message);
					setSubmitBtnContent("Login");
				} else {
					// setIsNIDexist(false);
					setNationalIDError("");
					setSubmitBtnContent("Confirm");
				}
			})
			.catch((error) => console.error("Error:", error));
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

	// check if any input is empty
	const validateInputsValues = (inputs) => {
		let error = false;

		Array.from(inputs).forEach((input) => {
			if (input[1].length === 0) {
				error = true;
				console.error(`Error: ${input[0]} is required`); // Log error message for empty input
				// Set error message for empty input using state setter functions
				switch (input[0]) {
					case "NID":
						setNationalIDError(`${input[0]} is required`);
						break;
					case "username":
						setUsernameError(`${input[0]} is required`);
						break;
					case "email":
						setEmailError(`${input[0]} is required`);
						break;
					case "password":
						setPasswordError(`${input[0]} is required`);
						break;
					default:
						break;
				}
			}
		});
		if (confirmPass.length === 0) {
			error = true;
			setConfirmPasswordError("confirm Password is required");
		}
		return error; // Return true indicating if any input is empty
	};

	const handelSubmit = async (e) => {
		const part1 = document.getElementById("part1");
		const part2 = document.getElementById("part2");
		const nationalID = document.getElementById("NID");
		const submitBtn = document.querySelector(".Auth form .submit button");
		const form = document.querySelector(".Auth form");
		e.preventDefault();

		if (submitBtn.textContent === "Confirm") {
			if (nationalID.value.length !== 0 && nationalIDError.length === 0) {
				setSubmitBtnContent("Submit");
				document.querySelector(".Auth form .submit ").style.top = "unset";
				document.querySelector(".Auth form .submit ").style.bottom = "0px";
				setTimeout(() => {
					part2.style.display = "block";
				}, 500);
				part1.style.top = "0";
				part1.style.transform = "translateY(0)";
				nationalID.setAttribute("disabled", true); // Set the aria-disabled attribute to 'true'
			}
		} else if (submitBtn.textContent === "Submit") {
			// Form data validation logic here
			const formData = new FormData(form);
			// Manually append the National ID to the form data
			formData.append("NID", nationalID.value);
			let anyInputIsEmpty = validateInputsValues(formData);
			if (
				!nationalIDError &&
				!usernameError &&
				!emailError &&
				!passwordError &&
				!confirmPasswordError &&
				anyInputIsEmpty !== true
			) {
				// If no errors exist, send form data to API
				try {
					const response = await fetch(
						"https://alumnimanagmentsys12.000webhostapp.com/APIs/alumni_signup.php",
						{
							method: "POST",
							body: formData,
						}
					);
					const data = await response.json();

					// Handle response from API here
					// Example: Check if response indicates success or error
					if (response.ok) {
						// Success
						Swal.fire({
							title: "Success!",
							text: "Alumni sign-up successful!",
							icon: "success",
						});
						setTimeout(() => {
							// Redirect to login page after 3 seconds
							navigate("/login");
						}, 3000);

						console.log("Alumni sign-up successful!");
					} else {
						// Error
						console.error("Error: " + data.error);
					}
				} catch (error) {
					console.error("Error: " + error.message);
				}
			}
		} else {
			if (nationalID.value.length !== 0 && nationalIDError.length === 0) {
				// go to login
				navigate("/login");
			}
		}
	};
	return (
		<div className="Auth AlumniSignup">
			<div className="container-fluid">
				<Backbtn
					btnColor={"white"}
					btnSize={"25px"}
					btnTop={"10px"}
					btnColorMobile={"var(--Alumni-color)"}
					btnSizeMobile={"15px"}
					btnTopMobile={"10px"}
				/>
				<div className="row">
					<div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center">
						<img src={alumniImg} alt="" />
					</div>
					<div className="col-12 col-md-6">
						<div className="introText p-4">
							<h1>Signup</h1>
							<p className="text-black-50">join to us as a Alumni</p>
						</div>
						<div className="form">
							<form action="#" method="post" onSubmit={handelSubmit}>
								<div className="part1" id="part1">
									<div className="nationalID mb-3">
										<div className="input-group p-2">
											<span className="input-group-text" id="basic-addon1">
												<img src={icon1} alt="" />
											</span>
											<input
												name="NID"
												id="NID"
												type="text"
												className="form-control"
												placeholder="National ID"
												aria-label="National ID"
												aria-describedby="basic-addon1"
												onChange={(e) => {
													// Validate national ID syntax
													const regex = /^[0-9]{14}$/; // Regular expression for 14 digits
													if (!regex.test(e.target.value)) {
														setNationalIDError("Invalid National ID syntax.");
													} else {
														setNationalIDError("");
														// setNationalID(e.target.value);
														NIDchecker(e.target.value);
													}
												}}
											/>
										</div>
										<h5 className="error">{nationalIDError}</h5>
									</div>
								</div>

								<div className="part2 position-absolute" id="part2">
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
													// Validate username syntax
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
									<div className="email mb-3">
										<div className="input-group p-2">
											<span className="input-group-text" id="basic-addon1">
												<img src={icon4} alt="" />
											</span>
											<input
												name="email"
												id="email"
												type="email"
												className="form-control"
												placeholder="Email"
												aria-label="Email"
												aria-describedby="basic-addon1"
												onChange={(e) => {
													if (
														!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
													) {
														setEmailError("Invalid Email Address");
													} else {
														setEmailError("");
														emailChecker(e.target.value);
													}
												}}
											/>
										</div>
										<h5 className="error">{emailError}</h5>
									</div>

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
													<img
														src={hide}
														alt=""
														onClick={() => setShowPassword(false)}
													/>
												) : (
													<img
														src={show}
														alt=""
														onClick={() => setShowPassword(true)}
													/>
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
								</div>
								<div className="submit text-center position-absolute w-100">
									<button className="btn px-5" type="submit">
										{submitBtnContent}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<ProgressLine />
			</div>
		</div>
	);
};

export default AlumniSignup;
