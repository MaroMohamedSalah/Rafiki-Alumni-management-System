import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import skillIcon from "../imgs/skills icon.svg";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileSkills = () => {
	const [isEmpty, setIsEmpty] = useState(true);
	return (
		<section
			className={
				isEmpty === true ? "ProfileSkills sec empty" : "ProfileSkills sec"
			}
		>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<img src={skillIcon} alt="" />
				</span>{" "}
				Skills
				<OverlayTrigger
					overlay={
						<Tooltip id="my-tooltip" style={{ marginBottom: "10px" }}>
							Visibility
						</Tooltip>
					}
					placement="bottom"
				>
					<div className="visibility position-absolute">
						<i className="fa-solid fa-user-tie"></i>
					</div>
				</OverlayTrigger>
				<OverlayTrigger
					overlay={
						<Tooltip id="my-tooltip" style={{ marginBottom: "10px" }}>
							Add Skill
						</Tooltip>
					}
					placement="bottom"
				>
					<div className="add position-absolute" id="add-skill">
						<i className="fa-solid fa-plus"></i>
					</div>
				</OverlayTrigger>
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<div className="skill-placeholder">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Add Your Skills</h1>
					</div>
				</div>
			) : null}
		</section>
	);
};

export default ProfileSkills;
