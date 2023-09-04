import { Skeleton, Tooltip } from "@mui/material";
import { useState } from "react";

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
				<Tooltip title="Visibility">
					<div className="visibility position-absolute">
						<i className="fa-solid fa-earth-americas"></i>
					</div>
				</Tooltip>
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
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
