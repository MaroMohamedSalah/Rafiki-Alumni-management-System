import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import skillIcon from "../imgs/skills icon.svg";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileSkills = ({ skills }) => {
	const displaySkills = () => {
		return skills.map((skill) => (
			<li key={skill.Skill_Name} className="col-12 col-md-6">
				<div className="skill px-3 py-1 d-flex justify-content-between align-items-center mt-2">
					<span className="title">{skill.Skill_Name}</span>
					<div className="stars">
						{Array.from({ length: skill.Rate }).map((_, index) => (
							<span key={index} className="star pe-1">
								<i class="fa-solid fa-star"></i>
							</span>
						))}
						{skill.Rate < 5 &&
							Array.from({ length: 5 - skill.Rate }).map((_, index) => (
								<span key={index} className="star empty pe-1">
									<i class="fa-regular fa-star"></i>
								</span>
							))}
					</div>
				</div>
			</li>
		));
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
						<div className="add position-absolute">
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
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
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
