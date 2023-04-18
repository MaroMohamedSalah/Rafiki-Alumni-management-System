import studentImg from "../imgs/Student img 2.svg";
import icon1 from "../imgs/sign up 1.svg";
import icon2 from "../imgs/sign up  2.svg";
import icon3 from "../imgs/sign up 3.svg";
import icon4 from "../imgs/sign up 4.svg";
import icon5 from "../imgs/sign up 5.svg";
import icon6 from "../imgs/sign up 6.svg";
import show from "../imgs/show password.svg";
import hide from "../imgs/hide password.svg";
import React, { useState, useEffect } from "react";
import "./Auth.css";
import ProgressLine from "../components/ProgressLine";
import Backbtn from "../components/Backbtn";

const CurrantStudentSignup = () => {
	const [submitBtnContent, setSubmitBtnContent] = useState("Confirm");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	// Define state variables for error messages
	const [nationalIDError, setNationalIDError] = useState();
	const [collageIDError, setCollageIDError] = useState();
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
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
	useEffect(() => {
		const part1 = document.getElementById("part1");
		const part2 = document.getElementById("part2");
		const nationalID = document.getElementById("NID");
		const ID = document.getElementById("ID");
		const submitBtn = document.querySelector(".Auth form .submit button");
		submitBtn.onclick = (e) => {
			e.preventDefault();
			if (nationalIDError === "" && collageIDError === "") {
				setSubmitBtnContent("submit");
				document.querySelector(".Auth form .submit ").style.top = "459px";
				setTimeout(() => {
					part2.style.display = "block";
				}, 500);
				part1.style.top = "0";
				part1.style.transform = "translateY(0)";
				ID.setAttribute("disabled", true); // Set the aria-disabled attribute to 'true'
				nationalID.setAttribute("disabled", true); // Set the aria-disabled attribute to 'true'
			}
		};
	}, [collageIDError, nationalIDError]);
	return (
		<div className="Auth StudentSignup">
			<div className="container-fluid">
				<Backbtn
					btnColor={"white"}
					btnSize={"25px"}
					btnTop={"10px"}
					btnColorMobile={"var(--Student-color)"}
					btnSizeMobile={"15px"}
					btnTopMobile={"10px"}
				/>
				<div className="row">
					<div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center">
						<img src={studentImg} alt="" />
					</div>
					<div className="col-12 col-md-6">
						<div className="introText p-4">
							<h1>Signup</h1>
							<p className="text-black-50">join to us as a student</p>
						</div>
						<div className="form">
							<form action="#" method="post">
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
													e.target.value === "20210899"
														? setNationalIDError("")
														: setNationalIDError("Invalid National Id");
												}}
											/>
										</div>
										<h5 className="error">{nationalIDError}</h5>
									</div>
									<div className="ID mb-3">
										<div className="input-group p-2">
											<span className="input-group-text" id="basic-addon1">
												<img src={icon2} alt="" />
											</span>
											<input
												name="ID"
												id="ID"
												type="text"
												className="form-control"
												placeholder="Collage ID"
												aria-label="Collage ID"
												aria-describedby="basic-addon1"
												onChange={(e) => {
													e.target.value === "20210899"
														? setCollageIDError("")
														: setCollageIDError("Invalid Collage ID");
												}}
											/>
										</div>
										<h5 className="error">{collageIDError}</h5>
									</div>
									<div></div>
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
													e.target.value === "marwan"
														? setUsernameError("")
														: setUsernameError("Invalid Username");
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

export default CurrantStudentSignup;
