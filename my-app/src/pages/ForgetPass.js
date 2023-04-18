import { useNavigate } from "react-router-dom";
import Backbtn from "../components/Backbtn";
import "./Auth.css";
import forgetPassImg from "../imgs/forget pass img.svg";
import icon1 from "../imgs/sign up 4.svg";
import axios from "axios";
import { useEffect, useState } from "react";

const ForgetPass = () => {
	const [emailError, setEmailError] = useState("");
	const [email, setEmail] = useState("");
	const [playSound, setPlaySound] = useState(false);
	const [showToast, setShowToast] = useState(false); // Added state for toast visibility
	const [recipient, setRecipient] = useState("");
	const navigate = useNavigate();
	const handelFormSubmit = (e) => {
		e.preventDefault();
		if (emailError === "") {
			// Show toast when form is submitted
			setShowToast(true);
			setPlaySound(true);
			// sendEmail();
			setTimeout(() => {
				navigate("/sendEmail");
			}, 5000);
		}
	};

	const sendEmail = () => {
		// Create an email object with recipient, subject, and body
		const email = {
			to: recipient,
			subject: "TEST",
			body: "TEST TEST TEST",
		};

		// Make a POST request to SendGrid API to send the email
		axios
			.post("https://api.sendgrid.com/v3/mail/send", email, {
				headers: {
					Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`, // Replace with your SendGrid API key
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log("Email sent successfully:", response);
			})
			.catch((error) => {
				console.error("Failed to send email:", error);
			});
	};
	useEffect(() => {
		// Play sound when playSound state changes
		if (playSound) {
			const audio = new Audio("../sounds/notification 1.mp3"); // Replace with the path to your sound file
			audio.play();
			setPlaySound(false);
		}
	}, [playSound]);
	return (
		<div className="Auth ForgetPass">
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
						<div className="image img-fluid overflow-hidden w-100"></div>
						<img src={forgetPassImg} alt="" />
					</div>
					<div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
						<div className="introText p-4 w-100">
							<h1>Forget Password ?</h1>
							<p className="text-black-50 text-center">
								Enter your email address associated with your account and we'll
								send you a link to reset your password
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
											onChange={(e) => {
												if (
													!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
												) {
													setEmailError("Invalid Email Address");
												} else {
													setEmailError("");
													setEmail(e.target.value);
													setRecipient(e.target.value);
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
					</div>
				</div>
				{/* Toast notification */}
				<div className="toast-container position-fixed bottom-0 end-0 p-3">
					<div
						id="liveToast"
						className={`toast ${showToast ? "show" : ""}`}
						role="alert"
						aria-live="assertive"
						aria-atomic="true"
					>
						<div className="toast-header">
							<div className="rounded me-2"></div>
							<strong className="me-auto">Check Your Email!</strong>
							<small>1 seconds ago</small>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="toast"
								aria-label="Close"
								onClick={() => setShowToast(false)} // Added onClick event to close the toast
							></button>
						</div>
						<div className="toast-body">We Have Send The Link to {email}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ForgetPass;
