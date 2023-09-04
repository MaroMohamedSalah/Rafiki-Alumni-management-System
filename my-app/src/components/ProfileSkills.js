import { OverlayTrigger, Tooltip } from "react-bootstrap";
import skillIcon from "../imgs/skills icon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconButton, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileSkills = () => {
	const skills = useSelector((state) => state.profile.userInfo.user.UserSkills);
	const navigate = useNavigate();
	const handelAddSkills = () => {
		navigate("addSkills");
	};
	const displaySkills = () => {
		return skills.map((skill) => (
			<li key={skill.Skill_Name} className="col-12 col-md-3">
				<div className="skill px-3 py-1 d-flex justify-content-between align-items-center mt-2">
					<span className="title">{skill.Skill_Name}</span>
					<div className="stars">
						<Rating name="disabled" value={skill.Rate} readOnly />
					</div>
					<IconButton aria-label="delete" size="small">
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</div>
			</li>
		));
	};

	const handelDeleteSkill = () => {};

	return (
		<section
			className={skills ? "ProfileSkills sec " : "ProfileSkills sec empty"}
		>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<img src={skillIcon} alt="" />
				</span>{" "}
				Skills
				<>
					<OverlayTrigger
						overlay={<Tooltip id="my-tooltip">Visibility</Tooltip>}
						placement="bottom"
					>
						<div className="visibility position-absolute">
							<i className="fa-solid fa-user-tie"></i>
						</div>
					</OverlayTrigger>
					<OverlayTrigger
						overlay={<Tooltip id="my-tooltip">Add skills</Tooltip>}
						placement="bottom"
					>
						<div className="add position-absolute" onClick={handelAddSkills}>
							<i className="fa-solid fa-plus"></i>
						</div>
					</OverlayTrigger>
				</>
			</h1>
			{skills.length === 0 || !skills ? (
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
					<div
						className="add position-absolute d-flex justify-content-center align-items-center flex-column"
						onClick={handelAddSkills}
					>
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Add Your Skills</h1>
					</div>
				</div>
			) : (
				<ul className="skillsList row p-0">{displaySkills()}</ul>
			)}
		</section>
	);
};

export default ProfileSkills;
