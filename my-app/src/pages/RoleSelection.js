import React from "react";
import { Link } from "react-router-dom";
import "./RoleSelection.css";
function RoleSelection() {
	return (
		<div className="RoleSelection pt-5">
			<div className="container">
				<h1 className="title mb-5">
					Please Specify Your Role To <span>Signup</span>:
				</h1>
				<div className="row">
					<div className=" col-12 col-md-6">
						<Link to={"/alumniSignup"}>
							<button className="btn">Alumni</button>
						</Link>
					</div>

					<div className=" col-12 col-md-6">
						<Link to={"/StudentSignup"}>
							<button className="btn">Current Student</button>
						</Link>
					</div>

					<div className=" col-12 col-md-6">
						<Link to={"/hrSignup"}>
							<button className="btn">HR</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RoleSelection;
