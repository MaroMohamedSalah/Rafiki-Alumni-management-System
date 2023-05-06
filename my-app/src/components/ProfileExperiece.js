import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ProfileExperience = () => {
	const [isEmpty, setIsEmpty] = useState(true);
	return (
		<section
			className={
				isEmpty === true
					? "ProfileExperience sec empty"
					: "ProfileExperience sec"
			}
		>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-briefcase"></i>
				</span>{" "}
				Experience
				{/* <OverlayTrigger
					overlay={
						<Tooltip id="my-tooltip" style={{ marginRight: "10px" }}>
							Visibility
						</Tooltip>
					}
					placement="left"
				>
					<div className="visibility position-absolute">
						<i className="fa-solid fa-earth-americas"></i>
					</div>
				</OverlayTrigger> */}
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<div className="sec-placeholder-2">
						<span></span>
						<span></span>
						<span className="half"></span>
					</div>
					<div className="sec-placeholder-2">
						<span></span>
						<span></span>
						<span className="half"></span>
					</div>
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Add Your Experience & Jobs</h1>
					</div>
				</div>
			) : null}
		</section>
	);
};

export default ProfileExperience;
