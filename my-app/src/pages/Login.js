import { Link } from "react-router-dom";
import ProgressLine from "../components/ProgressLine";
import Backbtn from "../components/Backbtn";
import loginImg from "../imgs/login img.svg";
import "./Auth.css";
import icon1 from "../imgs/sign up 3.svg";
import icon2 from "../imgs/sign up 5.svg";
import show from "../imgs/show password.svg";
import hide from "../imgs/hide password.svg";
import { useState } from "react";

const Login = () => {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
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
							<form action="#" method="post">
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
