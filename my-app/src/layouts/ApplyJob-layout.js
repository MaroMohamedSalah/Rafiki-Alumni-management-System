import { Outlet } from "react-router-dom";
import "./applyJob.css";
import JobCards from "../components/jobsComponents/JobCards";
import { useSelector } from "react-redux";
import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../animations/no_jobs_found.json";

const ApplyJobLayout = () => {
	// const jobs = useSelector((state) => state.jobs.availableJobs);
	const isJobSelect = useSelector((state) => state.jobs.isJobSelect);
	// const [noJobs, setNoJobs] = useState(jobs.length === 0);
	return (
		<div className="ApplyJobLayout d-flex align-items-center justify-content-center">
			<div className="container">
				<div className="row m-0 position-relative">
					<div className="col-12 col-lg-5">
						<JobCards />
					</div>
					<div
						className={`col-12 col-lg-7 outlet ${isJobSelect ? "z-1" : "z-n1"}`}
					>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplyJobLayout;
