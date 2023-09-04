import { Tooltip } from "@mui/material";

const ProfileEdu = ({ actor }) => {
	return (
		<section className={"ProfileEdu sec"}>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-graduation-cap"></i>
				</span>{" "}
				Education
				<Tooltip title="Visibility">
					<div className="visibility position-absolute">
						<i className="fa-solid fa-user-tie"></i>
					</div>
				</Tooltip>
			</h1>
			<div>
				<ul className="edu-list">
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<h3 className="fw-bold">Studying level</h3>
							<h3>2019-2023</h3>
						</div>

						<h5 className="academic-specialization">
							<span>CS</span> Section
						</h5>

						<div className="row start-year">
							<div className="col-6">
								<h5>Start year:</h5>
							</div>
							<div className="col-6">
								<h5>2019</h5>
							</div>
						</div>

						<div className="row grad-year">
							<div className="col-6">
								<h5>Graduation year:</h5>
							</div>
							<div className="col-6">
								<h5>2023</h5>
							</div>
						</div>

						<div className="row gpa">
							<div className="col-6">
								<h5>Cumulative GPA:</h5>
							</div>
							<div className="col-6">
								<h5>3.8/4</h5>
							</div>
						</div>

						<div className="row status">
							<div className="col-6">
								<h5>Status:</h5>
							</div>
							<div className="col-6">
								<h5>{actor}</h5>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default ProfileEdu;
