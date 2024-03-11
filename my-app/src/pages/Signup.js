import hrImg from "../imgs/hrImg.svg";
import alumniImg from "../imgs/alumni-img-2.svg";
import studentImg from "../imgs/studentImg2.svg";
import React, { useState, useEffect } from "react";
import "./Auth.css";
import Backbtn from "../components/Backbtn";
import UsernameInput from "../components/UsernameInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FnameInput from "../components/FirstnameInput";
import LastnameInput from "../components/LastnameInput";
import DateOfBirthInput from "../components/DateOfBirthInput";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const Signup = () => {
	const [submitBtnContent, setSubmitBtnContent] = useState("Confirm");
	const [confirmPass, setConfirmPass] = useState("");
	const navigate = useNavigate(); // Get navigate function from react-router-dom

	// Define state variables for error messages
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [dateOfBirthError, setDateOfBirthError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const [actorName, setActorName] = useState("");
	const [actorImg, setActorImg] = useState("");
	const [actorId, setActorId] = useState();
	const [dateOfBirth, setDateOfBirth] = useState("");

	const { actor } = useParams();

	// check if any input is empty
	const validateInputsValues = (inputs) => {
		let error = false;

		Array.from(inputs).forEach((input) => {
			if (input[1].length === 0) {
				error = true;
				console.error(`Error: ${input[0]} is required`); // Log error message for empty input
				// Set error message for empty input using state setter functions
				switch (input[0]) {
					case "Username":
						setUsernameError(`${input[0]} is required`);
						break;
					case "Email":
						setEmailError(`${input[0]} is required`);
						break;
					case "Password":
						setPasswordError(`${input[0]} is required`);
						break;
					case "FirstName":
						setFirstNameError(`firstName is required`);
						break;
					case "LastName":
						setLastNameError(`lastName is required`);
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
		if (dateOfBirth === "") {
			error = true;
			setDateOfBirthError("Date Of Birth is required");
			console.log("Date Of Birth is required");
		}

		return error; // Return true indicating if any input is empty
	};

	const handelSubmit = async (e) => {
		const part1 = document.getElementById("part1");
		const part2 = document.getElementById("part2");
		const username = document.getElementById("username");
		const submitBtn = document.querySelector(".Auth form .submit button");
		const form = document.querySelector(".Auth form");
		e.preventDefault();

		if (submitBtn.textContent === "Confirm") {
			if (username.value.length !== 0 && usernameError.length === 0) {
				setSubmitBtnContent("Submit");
				document.querySelector(".Auth form .submit ").style.top = "unset";
				document.querySelector(".Auth form .submit ").style.bottom = "0px";
				setTimeout(() => {
					part2.style.display = "block";
				}, 500);
				part1.style.top = "0";
				part1.style.transform = "translateY(0)";
				username.setAttribute("disabled", true); // Set the aria-disabled attribute to 'true'
			}
		} else if (submitBtn.textContent === "Submit") {
			console.log(dateOfBirthError);
			// Form data validation logic here
			const formData = new FormData(form);
			// Manually append the username to the form data
			formData.append("UserName", username.value);
			let anyInputIsEmpty = validateInputsValues(formData);
			if (
				!firstNameError &&
				!lastNameError &&
				!usernameError &&
				!emailError &&
				!dateOfBirthError &&
				!passwordError &&
				!confirmPasswordError &&
				anyInputIsEmpty !== true
			) {
				// If no errors exist, send form data to API
				try {
					const response = await fetch(`${baseBackendUrl}/auth/register`, {
						method: "POST",
						body: JSON.stringify({
							UserName: formData.get("UserName"),
							Email: formData.get("Email"),
							Role_Id: actorId,
							Password: formData.get("Password"),
							Date_Of_Birth: dateOfBirth,
							FirstName: formData.get("FirstName"),
							LastName: formData.get("LastName"),
						}),
						headers: {
							"Content-Type": "application/json",
							"Demo-Code": "demo2023",
						},
					});
					const data = await response.json();

					// Handle response from API here
					// Example: Check if response indicates success or error
					if (response.status === 201) {
						// Success
						Swal.fire({
							title: "Success!",
							text: `${actorName} sign-up successful!`,
							icon: "success",
						});
						// Redirect to login page
						navigate("/login");

						console.log(`${actorName} sign-up successful!`);
					} else {
						// Error
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: data.message,
						});
						console.error("Error: " + data.message);
					}
				} catch (error) {
					console.error("Error: " + error.message);
				}
			}
		} else {
			if (usernameError.length !== 0) {
				// go to login
				navigate("/login");
			}
		}
	};

	useEffect(() => {
		switch (actor) {
			case "hr":
				setActorName("HR");
				setActorImg(hrImg);
				setActorId(4);
				break;
			case "alumni":
				setActorName("Alumni");
				setActorImg(alumniImg);
				setActorId(1);
				break;
			case "student":
				setActorName("Student");
				setActorImg(studentImg);
				setActorId(3);
				break;

			default:
				break;
		}
	}, [actor]);

	return (
		<div className={`Auth ${actorName}Signup Signup`}>
			<div className="container-fluid">
				<Backbtn
					btnColor={"white"}
					btnSize={"25px"}
					btnTop={"10px"}
					btnColorMobile={"var(--HR-color)"}
					btnSizeMobile={"15px"}
					btnTopMobile={"10px"}
				/>
				<div className="row">
					<div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center">
						<img src={actorImg} alt="" />
					</div>
					<div className="col-12 col-md-6">
						<div className="introText p-4">
							<h1>Signup</h1>
							<p className="text-black-50">join to us as a {actor}</p>
						</div>
						<div className="form">
							<form
								action="#"
								method="post"
								onSubmit={handelSubmit}
								className="d-flex flex-column justify-content-center align-items-center"
							>
								<div className="part1" id="part1">
									<UsernameInput
										setUsernameError={setUsernameError}
										usernameError={usernameError}
										isMain={true}
										setSubmitBtnContent={setSubmitBtnContent}
									/>
								</div>

								<div className="part2" id="part2">
									<div className="d-flex justify-content-between">
										<FnameInput
											firstNameError={firstNameError}
											setFirstNameError={setFirstNameError}
										/>
										<LastnameInput
											lastNameError={lastNameError}
											setLastNameError={setLastNameError}
										/>
									</div>

									<EmailInput
										emailError={emailError}
										setEmailError={setEmailError}
										actor={actor}
									/>

									<DateOfBirthInput
										dateOfBirthError={dateOfBirthError}
										setDateOfBirthError={setDateOfBirthError}
										setDateOfBirth={setDateOfBirth}
									/>

									<PasswordInput
										passwordError={passwordError}
										setPasswordError={setPasswordError}
										confirmPasswordError={confirmPasswordError}
										setConfirmPasswordError={setConfirmPasswordError}
										setConfirmPass={setConfirmPass}
									/>
								</div>
								<div className="submit text-center w-100">
									<button className="btn px-5" type="submit">
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

export default Signup;
