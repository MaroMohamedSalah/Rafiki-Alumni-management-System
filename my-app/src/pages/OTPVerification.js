// import React, { useState } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import icon4 from "../imgs/sign up 4.svg";

// function OTPVerification() {
// 	const [email, setEmail] = useState("");
// 	const [emailError, setEmailError] = useState("");
// 	const [otp, setOTP] = useState("");
// 	const [verificationId, setVerificationId] = useState(null);
// 	const [error, setError] = useState(null);
// 	const [isVerified, setIsVerified] = useState(false);

// 	const handleSendOTP = () => {
// 		setError(null);
// 		setIsVerified(false);
// 		firebase
// 			.auth()
// 			.sendSignInLinkToEmail(email, {
// 				url: "https://your-website-url.com/verify",
// 				handleCodeInApp: true,
// 			})
// 			.then((verificationId) => {
// 				setVerificationId(verificationId);
// 				window.localStorage.setItem("emailForOTP", email);
// 			})
// 			.catch((error) => {
// 				setError(error.message);
// 			});
// 	};

// 	const handleVerifyOTP = () => {
// 		setError(null);
// 		firebase
// 			.auth()
// 			.signInWithEmailLink(email, verificationId)
// 			.then((result) => {
// 				setIsVerified(true);
// 				console.log("OTP verified successfully!");
// 			})
// 			.catch((error) => {
// 				setError(error.message);
// 			});
// 	};

// 	return (
// 		<div className="OTP">
// 			<h1>OTP Verification</h1>
// 			{isVerified ? (
// 				<p>OTP verified successfully!</p>
// 			) : (
// 				<>
// 					<div className="email mb-3">
// 						<div className="input-group p-2">
// 							<span className="input-group-text" id="basic-addon1">
// 								<img src={icon4} alt="" />
// 							</span>
// 							<input
// 								name="email"
// 								id="email"
// 								type="email"
// 								className="form-control"
// 								placeholder="Email"
// 								aria-label="Email"
// 								aria-describedby="basic-addon1"
// 								onChange={(e) => {
// 									if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
// 										setEmailError("Invalid Email Address");
// 									} else {
// 										setEmailError("");
// 										setEmail(e.target.value);
// 									}
// 								}}
// 							/>
// 						</div>
// 						<h5 className="error">{emailError}</h5>
// 					</div>
// 					<button onClick={handleSendOTP}>Send OTP</button>
// 					{verificationId && (
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Enter OTP"
// 								value={otp}
// 								onChange={(e) => setOTP(e.target.value)}
// 							/>
// 							<button onClick={handleVerifyOTP}>Verify OTP</button>
// 						</div>
// 					)}
// 				</>
// 			)}
// 			{error && <p>{error}</p>}
// 		</div>
// 	);
// }

// export default OTPVerification;
