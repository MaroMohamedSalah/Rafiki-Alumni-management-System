import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobDescription } from "../../redux/actions/jobsActions";

const JobDescriptionTextarea = ({ label, placeholder }) => {
	const dispatch = useDispatch();
	const description = useSelector((state) => state.jobs.formData.Description);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);
	const [hasError, setHasError] = useState(false);

	// Use useEffect to retrieve the description from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the description from sessionStorage on component mount
		const storedDescription = sessionStorage.getItem("Job_Description");
		if (storedDescription !== null) {
			updateJobDescription(dispatch, storedDescription); // Update Redux state with the stored value
		}
	}, [dispatch]);

	const handleDescriptionChange = (event) => {
		const newDescription = event.target.value || null;

		// Check if the new description is empty, and remove the entity from sessionStorage if it is
		if (newDescription === null) {
			sessionStorage.removeItem("Job_Description");
		} else {
			// Store the description in sessionStorage
			sessionStorage.setItem("Job_Description", newDescription);
		}

		// Dispatch your Redux action to update the description in the store
		updateJobDescription(dispatch, newDescription);
	};

	useEffect(() => {
		missingInputs.includes("Description")
			? setHasError(true)
			: setHasError(false);
	}, [missingInputs]);

	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
			multiline
			name="Description"
			value={description || ""}
			onChange={handleDescriptionChange}
			error={hasError}
			helperText={hasError && "Job description is required"}
		/>
	);
};

export default JobDescriptionTextarea;
