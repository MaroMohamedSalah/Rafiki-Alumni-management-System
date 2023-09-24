import React, { useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobEduLevel } from "../../redux/actions/jobsActions";

const JobEduLevelSelect = ({ label }) => {
	// Define your education levels array
	const eduLevels = ["graduate", "undergraduate", "both"];
	const selectedLevel = useSelector(
		(state) => state.jobs.formData.Education_Level
	);

	// Redux dispatch function
	const dispatch = useDispatch();

	// Use useEffect to retrieve the selected education level from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the selected education level from sessionStorage on component mount
		const storedEduLevel = sessionStorage.getItem("Education_Level");
		if (storedEduLevel !== null) {
			updateJobEduLevel(dispatch, storedEduLevel); // Update Redux state with the stored value
		}
	}, [dispatch]);

	// Define the handler for education level change
	const handleEducationLevelChange = (e) => {
		const newEducationLevel = e.target.value;

		// Check if the new education level is empty, and remove the entity from sessionStorage if it is
		if (newEducationLevel === "") {
			sessionStorage.removeItem("Education_Level");
		} else {
			// Store the selected education level in sessionStorage
			sessionStorage.setItem("Education_Level", newEducationLevel);
		}

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
