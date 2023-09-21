import React from "react";
import { TextField } from "@mui/material/node";
import { useSelector, useDispatch } from "react-redux";
import { updateJobDuration } from "../../redux/actions/jobsActions";

const JobDurationInput = () => {
	// Get the internship duration value from Redux store
	const internshipDuration = useSelector(
		(state) => state.jobs.formData.Duration
	);

	// Redux dispatch function
	const dispatch = useDispatch();

	// Define the handler for internship duration change
	const handleDurationChange = (e) => {
		const newDuration = e.target.value;
		// Dispatch your Redux action to update the internship duration in the store
		updateJobDuration(dispatch, newDuration);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="Internship Duration"
			placeholder="Enter the internship Duration"
			fullWidth
			name="Duration"
			value={internshipDuration || ""}
			onChange={handleDurationChange}
		/>
	);
};

export default JobDurationInput;
