import { useEffect, useState } from "react";
import BackToProfileBtn from "../components/BackToProfileBtn";
import ProfileSkills from "../components/ProfileSkills";
import {
	Autocomplete,
	Rating,
	TextField,
	createFilterOptions,
} from "@mui/material";
import Toast from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileSkills } from "../redux/actions/profileActions";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const filter = createFilterOptions();

const AddSkills = () => {
	const [skillRate, setSkillRate] = useState(2);
	const [options, setOptions] = useState([]);
	const [unExistingSkillId, setUnExistingKillId] = useState();
	const userSkills = useSelector(
		(state) => state.profile.userInfo.user.UserSkills
	);
	const [selectedSkill, setSelectedSkill] = useState(null); // Track the selected skill
	const sessionId = localStorage.getItem("sessionId");
	const dispatch = useDispatch();

	const getSkills = () => {
		fetch(`${baseBackendUrl}/skills/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Upload failed");
				}
				return res.json();
			})
			.then((data) => {
				if (data.success) {
					let skills = data.skills.map((e) => ({
						label: e.Skill_Name,
						id: e.Skill_Id,
					}));

					setOptions(skills);
				} else {
					Toast({ title: data.message, icon: "error" });
				}
			});
	};

	const addSkillToUser = (skill_id, rate) => {
		fetch(`${baseBackendUrl}/user_skills/`, {
			method: "POST",
			body: JSON.stringify({
				Skill_Id: skill_id,
				Rate: rate,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => {
				if (res.status === 409) {
					// Handle the conflict error here
					console.error("Conflict error: Skill already exists.");
					Toast({ title: "Skill already exists", icon: "error" });
				} else if (!res.ok) {
					throw new Error("Add Skill failed");
				}
				return res.json();
			})
			.then((data) => {
				if (data.success) {
					Toast({ title: "Your Skill Added", icon: "success" });
					const updatedUserSkills = [
						...userSkills,
						{
							Skill_Name: selectedSkill,
							Rate: skillRate,
							id: data.User_Skill_Id,
						},
					];
					updateProfileSkills(dispatch, updatedUserSkills);
					// Clear the selected skill and input
					setSelectedSkill(null);
					setSkillRate(2);
				} else {
					Toast({ title: data.message, icon: "error" });
				}
			})
			.catch((err) => Toast({ title: err.message, icon: "error" }));
	};

	const addUnExistingSkill = () => {
		fetch(`${baseBackendUrl}/skills/`, {
			method: "POST",
			body: JSON.stringify({
				Skill_Name: selectedSkill,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Add Skill failed");
				}
				return res.json();
			})
			.then((data) => {
				if (data.success) {
					console.log("done", data.message);
					addSkillToUser(data.skill.Skill_Id, skillRate);
				} else {
					console.log("error", data.message);
				}
			})
			.catch((err) => Toast({ title: err.message, icon: "error" }));
	};

	const handleSaveSkill = () => {
		if (selectedSkill) {
			// Check if the skill is already in the options
			const existingSkill = options.find(
				(option) => option.label === selectedSkill
			);

			if (existingSkill) {
				// Skill is in the database, handle saving
				console.log("Skill is in the database");
				const skill_id = existingSkill.id;
				addSkillToUser(skill_id, skillRate);
			} else {
				// Skill is not in the database, show a confirmation dialog or handle as needed
				console.log("Skill is not in the database");
				addUnExistingSkill();
			}
		} else {
			// No skill selected, show an error message
			console.error("No skill selected");
		}
	};

	useEffect(() => {
		getSkills();
		console.log(options);
	}, []);

	return (
		<div className="addSkills">
			<div className="container">
				<BackToProfileBtn />
			</div>

			<div className="title w-100 text-center py-4 fs-1 fw-bold text-white">
				Adding Skills
			</div>

			<ProfileSkills />

			<div className="skill pt-3 d-flex justify-content-between align-items-center mt-2 row">
				<Autocomplete
					className="col-6 col-md-8"
					disablePortal
					id="combo-box-demo"
					options={options}
					renderInput={(params) => (
						<TextField {...params} label="Select Skill" />
					)}
					onInputChange={(event, newInputValue) => {
						setSelectedSkill(newInputValue);
					}}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);

						const { inputValue } = params;
						// Suggest the creation of a new value
						const isExisting = options.some(
							(option) => inputValue === option.label
						);
						if (inputValue !== "" && !isExisting) {
							filtered.push({
								label: inputValue,
							});
						}

						return filtered;
					}}
				/>

				<div className="stars px-4 col-6 col-md-2">
					<Rating
						name="simple-controlled"
						value={skillRate}
						size="normal"
						onChange={(event, newValue) => {
							setSkillRate(newValue);
						}}
					/>
				</div>

				<div className=" col-12 col-md">
					<button
						className="btn save px-4 m-1 fw-bold w-100"
						onClick={handleSaveSkill}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};
export default AddSkills;
