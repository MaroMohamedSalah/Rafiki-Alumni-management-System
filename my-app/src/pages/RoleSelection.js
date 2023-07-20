import React from "react";
import { Link } from "react-router-dom";
import "./RoleSelection.css";
import AlumniImg from "../imgs/alumni-img.png";
import StudentImg from "../imgs/Student img.svg";
import HRImg from "../imgs/HR img.svg";
import ProgressLine from "../components/ProgressLine";
import Backbtn from "../components/Backbtn";
function RoleSelection() {
	return (
		<div className="RoleSelection">
			<div className="container">
				<Backbtn
					btnColor={"var(--HR-color)"}
					btnSize={"25px"}
					btnTop={"28px"}
					btnColorMobile={"var(--Alumni-color)"}
					btnSizeMobile={"20px"}
					btnTopMobile={"20px"}
				/>
				<h1 className="title p-3 text-center">Please Specify Your Role</h1>
				<div className="row">
					<div className="col-12 col-md-6">
						<Link to={"/alumniSignup"} className="alumni mt-3">
							<h1>Alumni</h1>
							<div className="image img-fluid h-100">
								<img className="h-100" src={AlumniImg} alt="" />
							</div>
						</Link>
					</div>
					<div className="col-12 col-md-6">
						<Link to={"/studentSignup"} className="student mt-3">
							<h1>Student</h1>
							<div className="image img-fluid h-100">
								<img className="h-100" src={StudentImg} alt="" />
							</div>
						</Link>
					</div>
					<div className="col-12">
						<Link to={"/hrSignup"} className="mt-3 hr">
							<h1>HR</h1>
							<div className="image img-fluid h-100">
								<img className="h-100" src={HRImg} alt="" />
							</div>
						</Link>
					</div>
				</div>
				<ProgressLine />
			</div>
		</div>
	);
}

export default RoleSelection;
