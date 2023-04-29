import { Link, useNavigate } from "react-router-dom";
import ProgressLine from "../components/ProgressLine";
import Backbtn from "../components/Backbtn";
import loginImg from "../imgs/login img.svg";
import "./Auth.css";
import icon1 from "../imgs/sign up 3.svg";
import icon2 from "../imgs/sign up 5.svg";
import show from "../imgs/show password.svg";
import hide from "../imgs/hide password.svg";
import { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate(); // Get navigate function from react-router-dom

	// check if any input is empty
	const validateInputsValues = (inputs) => {
		let error = false;

		Array.from(inputs).forEach((input) => {
			if (input[1].length === 0) {
				error = true;
				console.error(`Error: ${input[0]} is required`); // Log error message for empty input
				// Set error message for empty input using state setter functions
				switch (input[0]) {
					case "username":
						setUsernameError(`${input[0]} is required`);
						break;
					case "password":
						setPasswordError(`${input[0]} is required`);
						break;
					default:
						break;
				}
			}
		});
		return error; // Return true indicating if any input is empty
	};

	const handelSubmit = async (e) => {
		const submitBtn = document.querySelector(".Auth form .submit button");
		const form = document.querySelector(".Auth form");
		e.preventDefault();

		// Form data validation logic here
		const formData = new FormData(form);
		let anyInputIsEmpty = validateInputsValues(formData);
		if (!usernameError && !passwordError && anyInputIsEmpty !== true) {
			submitBtn.setAttribute("disabled", true);
			// If no errors exist, send form data to API
			try {
				const response = await fetch(
					"https://alumnimanagmentsys12.000webhostapp.com/APIs/login.php",
					{
						method: "POST",
						body: formData,
					}
				);
				const data = await response.json();

				// Handle response from API here
				// Example: Check if response indicates success or error
				submitBtn.removeAttribute("disabled");
				if (data.status !== "error") {
					// record the user id in localStorage
					localStorage.setItem("UserID", data.user_id);
					// Success
					Swal.fire({
						title: "Success!",
						text: `You Logged in successfully, as ${data.actor}!`,
						icon: "success",
					});
					setTimeout(() => {
						// Redirect to Actor profile page after 3 seconds
						switch (data.actor) {
							case "Alumni":
								navigate("/alumniProfile");
								break;

							default:
								break;
						}
					}, 3000);

					console.log("Logged in successful!", data);
				} else {
					// Error
					console.error("Error: " + data.message);
					setPasswordError("Password or Username may be incorrect");
					setUsernameError("Password or Username may be incorrect");
				}
			} catch (error) {
				console.error("Error: " + error.message);
			}
		}
	};
	return (
		<div className="Auth Login">
			<div className="container-fluid">
				<Backbtn
					btnColor={"var(--login-color-2)"}
					btnSize={"25px"}
					btnTop={"10px"}
					btnColorMobile={"var(--Alumni-color)"}
					btnSizeMobile={"15px"}
					btnTopMobile={"10px"}
				/>
				<div className="row">
					<div className="col-12 col-md-6 d-none d-md-flex justify-content-between align-items-center flex-column">
						<img src={loginImg} alt="" />
						<div className="toSignup d-flex justify-content-center align-items-center w-100 mb-2">
							<h5 className="m-0">Not A Member ? </h5>
							<span>
								<Link to={"/roleSelection"}>
									<button className="btn px-4 py-1 fs-6 text mx-4">
										Signup
									</button>
								</Link>
							</span>
						</div>
					</div>
					<div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
						<div className="introText p-4 w-100">
							<h1>Welcome Again!</h1>
							<p className="text-black-50">welcome back again to us </p>
						</div>
						<div className="form w-75">
							<form action="#" method="post" onSubmit={handelSubmit}>
								<div className="username mb-3">
									<div className="input-group p-2">
										<span className="input-group-text" id="basic-addon1">
											<img src={icon1} alt="" />
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
												const regex = /^[a-zA-Z0-9_]{3,20}$/;
												if (!regex.test(e.target.value)) {
													setUsernameError(
														"Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
													);
												} else {
													setUsernameError("");
												}
											}}
										/>
									</div>
									<h5 className="error">{usernameError}</h5>
								</div>

								<div className="password mb-3">
									<div className="input-group p-2">
										<span className="input-group-text" id="basic-addon1">
											<img src={icon2} alt="" />
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
												e.target.value < 6
													? setPasswordError("Invalid Password length")
													: setPasswordError("");
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
								<div className="submit text-center w-100">
									<button className="btn px-5 w-75" type="submit">
										Submit
									</button>
								</div>
								<h5 className="text-center forgetPass">
									forget password?{" "}
									<Link className="d-block d-md-inline" to={"/resetPass"}>
										Reset Password
									</Link>{" "}
								</h5>
								<div className="image img-fluid w-75 opacity-50 d-block d-md-none">
									<img className="w-100" src={loginImg} alt="" />
								</div>
								<div className="toSignup d-flex d-md-none justify-content-evenly align-items-center w-100 mb-2">
									<h5 className="m-0">Not A Member ? </h5>

									<Link to={"/roleSelection"}>
										<button className="btn px-4 py-1 fs-6 text m-0">
											Signup
										</button>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
