import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import animationData from "../animations/animation_lmbya141.json";
import Lottie from "lottie-react";
import Countdown from "react-countdown";
import { Button } from "@mui/material/node";
import { updateResetPassLoading } from "../redux/actions/passwordResetActions";

const CheckYourEmail = () => {
	const isEmailSend = useSelector((state) => state.passwordReset.isEmailSent);
	const email = useSelector((state) => state.passwordReset.email);
	const [isTimerEnded, setIsTimerEnded] = useState(false);
	const [expirationTime, setExpirationTime] = useState(Date.now() + 180000); // 3 minutes in milliseconds
	const [resetSuccess, setResetSuccess] = useState(
		localStorage.getItem("passwordResetSuccess")
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const reSendEmail = async () => {
		updateResetPassLoading(dispatch, true);
		try {
			const response = await fetch("${baseBackendUrl}/auth/reset_password", {
				method: "POST",
				body: JSON.stringify({
					email: email,
				}),
				headers: {
					"Content-Type": "application/json",
					"Demo-Code": "demo2023",
				},
			});

			if (!response.ok) {
				// Handle non-200 HTTP status codes

				throw new Error(`Request failed with status ${response.status}`);
			}

			const data = await response.json();

			if (data.success) {
				updateResetPassLoading(dispatch, false);
				Toast({ title: "We Resent an Email To Your!", icon: "success" });
				restartTimer();
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
	};
	const restartTimer = () => {
		setExpirationTime(Date.now() + 180000); // Restart the timer to 3 minutes
		setIsTimerEnded(false);
	};

	useEffect(() => {
		if (isEmailSend === false) {
			Toast({ title: "Enter Your Email First", icon: "info" });
			navigate("/resetPass");
		}
	}, [isEmailSend, navigate]);

	useEffect(() => {
		// Function to handle storage event
		const handleStorageChange = (e) => {
			if (e.key === "passwordResetSuccess" && e.newValue === "true") {
				console.log("Status updated");
				// Navigate to the login page

				navigate("/Login");
			}
		};

		// Add event listener
		window.addEventListener("storage", handleStorageChange);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [navigate]);

	return (
		isEmailSend === true && (
			<div className="CheckYourEmail pt-5">
				<div className="introText p-4 w-100 text-center">
					<div className="row">
						<div className="col-12 col-md-6 introText p-4 d-flex justify-content-center align-items-center flex-column">
							<h1 className="text-center text-md-start w-100">
								Check <br /> your mail
							</h1>
							<p className="text-center text-md-start w-100">
								We just sent a mail to your registered email address
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
				</div>

				<div className="resend w-100 text-center">
					<div className="timer">
						<Countdown
							date={expirationTime}
							key={Date.now()}
							onComplete={() => setIsTimerEnded(true)}
							renderer={({ minutes, seconds }) => (
								<span>
									{minutes}:{seconds < 10 ? "0" : ""}
									{seconds}
								</span>
							)}
						/>
					</div>
					<h3>Didn't get a code?</h3>
					<Button
						variant="contained"
						disabled={!isTimerEnded}
						onClick={reSendEmail}
					>
						Resend
					</Button>
				</div>
			</div>
		)
	);
};
export default CheckYourEmail;
