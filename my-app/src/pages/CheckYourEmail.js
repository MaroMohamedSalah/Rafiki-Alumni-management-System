import { useNavigate } from "react-router-dom";
import Backbtn from "../components/Backbtn";
import "./Auth.css";
import forgetPassImg from "../imgs/forget-pass-img.png";
import emailIcon from "../imgs/Send Email img.svg";

const CheckYourEmail = () => {
	return (
		<div className="Auth ForgetPass SendEmail">
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
						<div className="introText p-4 w-100 text-center">
							<img src={emailIcon} alt="" />
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
									<div className="position-absolute bottom-0 start-0 image img-fluid w-75 opacity-50 d-block d-md-none">
										<img className="w-100" src={forgetPassImg} alt="" />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CheckYourEmail;
