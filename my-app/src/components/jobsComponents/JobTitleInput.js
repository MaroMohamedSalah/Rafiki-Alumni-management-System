import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobTitle } from "../../redux/actions/jobsActions";

const JobTitleInput = ({ placeholder, label }) => {
	const dispatch = useDispatch();
	const jobTitle = useSelector((state) => state.jobs.formData.Job_Title);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);
	const [hasError, setHasError] = useState(false);

	// Use useEffect to retrieve the description from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the description from sessionStorage on component mount
		const storedJobTitle = sessionStorage.getItem("Job_Title");
		if (storedJobTitle !== null) {
			updateJobTitle(dispatch, storedJobTitle); // Update Redux state with the stored value
		}
	}, [dispatch]);

	const handleTitleChange = (e) => {
		const newJobTitle = e.target.value || null; // Convert empty string to null

		// Check if the newJobTitle is empty, and remove the entity from sessionStorage if it is
		if (newJobTitle === null) {
			sessionStorage.removeItem("Job_Title");
		} else {
			// Store the job title in sessionStorage
			sessionStorage.setItem("Job_Title", newJobTitle);
		}

		updateJobTitle(dispatch, newJobTitle);
	};

	useEffect(() => {
		missingInputs.includes("Job_Title")
			? setHasError(true)
			: setHasError(false);
	}, [missingInputs]);

	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
			value={jobTitle || ""}
			onChange={handleTitleChange}
			name="Job_Title"
			error={hasError}
			helperText={hasError && "Job title is required"}
		/>
	);
};

export default JobTitleInput;
