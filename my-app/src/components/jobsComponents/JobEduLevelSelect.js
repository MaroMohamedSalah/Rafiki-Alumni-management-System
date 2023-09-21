import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobEduLevel } from "../../redux/actions/jobsActions";

const JobEduLevelSelect = ({ name, label }) => {
	// Define your education levels array
	const eduLevels = ["graduate", "undergraduate", "both"];
	const selectedLevel = useSelector(
		(state) => state.jobs.formData.Education_Level
	);

	// Redux dispatch function
	const dispatch = useDispatch();

	// Define the handler for education level change
	const handleEducationLevelChange = (e) => {
		const newEducationLevel = e.target.value;
		// Dispatch your Redux action to update the education level in the store
		updateJobEduLevel(dispatch, newEducationLevel);
	};

	return (
		<TextField
			id="outlined-select"
			select
			label={label}
			defaultValue={eduLevels[0]}
			fullWidth
			onChange={(e) => handleEducationLevelChange(e)}
			value={selectedLevel}
		>
			{eduLevels.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default JobEduLevelSelect;
