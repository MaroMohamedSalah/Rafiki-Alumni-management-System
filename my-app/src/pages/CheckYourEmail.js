import { useNavigate } from "react-router-dom";
import Backbtn from "../components/Backbtn";
import "./Auth.css";
import forgetPassImg from "../imgs/forget-pass-img.png";
import emailIcon from "../imgs/Send Email img.svg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Toast from "../components/Toast";
import animationData from "../animations/animation_lmbya141.json";
import Lottie from "lottie-react";

const CheckYourEmail = () => {
	const isEmailSend = useSelector((state) => state.passwordReset.isEmailSent);
	const navigate = useNavigate();
	useEffect(() => {
		console.log("Email Sent?", isEmailSend);

		if (isEmailSend === false) {
			Toast({ title: "Enter Your Email First", icon: "info" });
			navigate("/resetPass");
		}
	}, [isEmailSend, navigate]);
	return (
		isEmailSend === true && (
			<div className="CheckYourEmail pt-5">
				{/* <Backbtn
				btnColor={"white"}
				btnSize={"25px"}
				btnTop={"10px"}
				btnColorMobile={"var(--Alumni-color)"}
				btnSizeMobile={"15px"}
				btnTopMobile={"10px"}
			/> */}
				<div className="introText p-4 w-100 text-center">
					<Lottie
						loop={true}
						autoplay
						animationData={animationData}
						style={{ height: "190px" }}
					/>

					<h1>Check Your Mail</h1>
					<p className="text-black-50 text-center">
						we have send you a link to reset your password for your mail
					</p>
				</div>
				<div className="form w-100">
					<form action="/">
						<div className="form w-100">
							<div className="submit text-center w-100">
								<button
									className="btn px-5"
									type="submit"
									onClick={() => {
										window.open("mailto:");
									}}
								>
									Open Mail App
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	);
};
export default CheckYourEmail;
