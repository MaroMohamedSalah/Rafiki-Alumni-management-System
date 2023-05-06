import "../pages/Auth.css";
import forgetPassImg from "../imgs/forget pass img.svg";
import icon1 from "../imgs/sign up 4.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SendEmail from "../pages/SendEmail";
import axios from "axios";

const ForgetPasswordForm = () => {
	const [emailError, setEmailError] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const handelFormSubmit = (e) => {
		e.preventDefault();
		if (emailError === "") {
			navigate("/sendEmail");
		}
	};

	useEffect(() => {
		axios
			.get(
				`https://alumnimanagmentsys12.000webhostapp.com/APIs/get_email.php?user_id=${localStorage.getItem(
					"UserID"
				)}`
			)
			.then((response) => {
				setEmail(response.data.email);
			})
			.catch((error) => {
				console.log(error);
			});
	});
	return (
		<>
			<div className="introText p-4 w-100">
				<h1>Forget Password ?</h1>
				<p className="text-black-50 text-center">
					Enter your email address associated with your account and we'll send
					you a link to reset your password
				</p>
			</div>
			<div className="form w-75">
				<form action="#" onSubmit={handelFormSubmit}>
					<div className="email mb-3">
						<div className="input-group p-2">
							<span className="input-group-text" id="basic-addon1">
								<img src={icon1} alt="" />
							</span>
							<input
								name="email"
								id="email"
								type="email"
								className="form-control"
								placeholder="Email"
								aria-label="Email"
								aria-describedby="basic-addon1"
								// value={email}
								onChange={(e) => {
									if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
										setEmailError("Invalid Email Address");
									} else {
										setEmailError("");
									}
								}}
							/>
						</div>
						<h5 className="error">{emailError}</h5>
					</div>
					<div className="submit text-center w-100">
						<button className="btn px-5 w-75" type="submit">
							Send
						</button>
					</div>
					<div className="position-absolute bottom-0 start-0 image img-fluid w-75 opacity-50 d-block d-md-none">
						<img className="w-100" src={forgetPassImg} alt="" />
					</div>
				</form>
			</div>
		</>
	);
};
export default ForgetPasswordForm;
