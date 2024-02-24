import skillIcon from "../imgs/skills icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Rating, Skeleton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Toast from "./Toast";
import { deleteSkill } from "../redux/actions/profileActions";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ProfileSkills = () => {
	const skills = useSelector((state) => state.profile.userInfo.user.UserSkills);
	const dispatch = useDispatch(); // Get the dispatch function
	const navigate = useNavigate();
	const sessionId = localStorage.getItem("sessionId");

	const handelAddSkills = () => {
		navigate("addSkills");
	};
	const displaySkills = () => {
		return skills.map((skill) => (
			<li key={skill.Skill_Name} className="col-12 col-md-6 col-xl-3">
				<div className="skill px-3 py-1 d-flex justify-content-between align-items-center mt-2">
					<span className="title">{skill.Skill_Name}</span>
					<div className="stars">
						<Rating name="disabled" value={skill.Rate} readOnly />
					</div>
					<IconButton
						aria-label="delete"
						size="small"
						onClick={() => handelDeleteSkill(skill.id)}
					>
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</div>
			</li>
		));
	};

	const handelDeleteSkill = (skillId) => {
		fetch(
			`${baseBackendUrl}/user_skills/${skillId}`,

			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			}
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Delete Skill failed");
				} else if (res.ok) {
					Toast({ title: "Skill Deleted", icon: "success" });

					// Dispatch the action to remove the skill from the Redux store
					deleteSkill(dispatch, skillId);
				}
				return res.json();
			})
			.catch((error) => {
				console.error(error);
			});
	};

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
					<Tooltip title="Visibility">
						<div className="visibility position-absolute">
							<i className="fa-solid fa-user-tie"></i>
						</div>
					</Tooltip>

					<Tooltip title="Add skills">
						<div className="add position-absolute" onClick={handelAddSkills}>
							<i className="fa-solid fa-plus"></i>
						</div>
					</Tooltip>
				</>
			</h1>
			{skills.length === 0 || !skills ? (
				<div className="empty-sec position-relative">
					<div className="skill-placeholder">
						<Skeleton animation="wave" width={"250px"} height={"50px"} />
						<Skeleton animation="wave" width={"250px"} height={"50px"} />
						<Skeleton animation="wave" width={"250px"} height={"50px"} />
						<Skeleton animation="wave" width={"250px"} height={"50px"} />
						<Skeleton animation="wave" width={"250px"} height={"50px"} />
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
