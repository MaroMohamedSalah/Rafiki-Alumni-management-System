import React, { useState } from "react";
import "./Auth.css";
import Backbtn from "../components/Backbtn";
import alumniImg from "../imgs/alumni-img-2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UsernameInput from "../components/UsernameInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import NationalIdInput from "../components/NationalIdInput";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const AlumniSignup = () => {
	const [submitBtnContent, setSubmitBtnContent] = useState("Confirm");
	const [confirmPass, setConfirmPass] = useState("");
	const navigate = useNavigate(); // Get navigate function from react-router-dom

	// Define state variables for error messages
	const [nationalIDError, setNationalIDError] = useState();
	const [usernameError, setUsernameError] = useState();
	const [emailError, setEmailError] = useState();
	const [passwordError, setPasswordError] = useState();
	const [confirmPasswordError, setConfirmPasswordError] = useState();

	// check if any input is empty
	const validateInputsValues = (inputs) => {
		let error = false;

		Array.from(inputs).forEach((input) => {
			if (input[1].length === 0) {
				error = true;
				console.error(`Error: ${input[0]} is required`); // Log error message for empty input
				// Set error message for empty input using state setter functions
				switch (input[0]) {
					case "National_Id":
						setNationalIDError(`${input[0]} is required`);
						break;
					case "UserName":
						setUsernameError(`${input[0]} is required`);
						break;
					case "Email":
						setEmailError(`${input[0]} is required`);
						break;
					case "Password":
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
			formData.append("National_Id", nationalID.value);
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
						`${baseBackendUrl}/users/alumni_signup`,
						{
							method: "POST",
							body: JSON.stringify({
								UserName: formData.get("UserName"),
								Email: formData.get("Email"),
								Password: formData.get("Password"),
								National_Id: formData.get("National_Id"),
							}),
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					const data = await response.json();

					// Handle response from API here
					// Example: Check if response indicates success or error
					if (response.status === 201) {
						// Success
						Swal.fire({
							title: "Success!",
							text: "Alumni sign-up successful!",
							icon: "success",
						});
						// Redirect to login page
						navigate("/login");
						console.log("Alumni sign-up successful!");
					} else {
						// Error
						console.error("Error: " + data.message);
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: data.message,
						});
					}
				} catch (error) {
					console.error("Error: " + error.message);
				}
			}
		} else {
			if (nationalID.value.length !== 0) {
				// go to login
				navigate("/login");
			}
		}
	};
	const makeVibrate = () => {
		if ("vibrate" in navigator) {
			navigator.vibrate([50]);
		}
	};
	return (
		<div className="Auth AlumniSignup Signup">
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
									{/* <NationalIdInput
										setNationalIDError={setNationalIDError}
										nationalIDError={nationalIDError}
										setSubmitBtnContent={setSubmitBtnContent}
										isMain={true}
									/> */}
									<UsernameInput
										setUsernameError={setUsernameError}
										usernameError={usernameError}
										isMain={false}
										setSubmitBtnContent={setSubmitBtnContent}
									/>
								</div>

								<div className="part2 position-absolute" id="part2">
									<EmailInput
										emailError={emailError}
										setEmailError={setEmailError}
									/>

									<PasswordInput
										passwordError={passwordError}
										setPasswordError={setPasswordError}
										confirmPasswordError={confirmPasswordError}
										setConfirmPasswordError={setConfirmPasswordError}
										setConfirmPass={setConfirmPass}
									/>
								</div>
								<div className="submit text-center position-absolute w-100">
									<button
										className="btn px-5"
										type="submit"
										onClick={makeVibrate}
									>
										{submitBtnContent}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlumniSignup;
