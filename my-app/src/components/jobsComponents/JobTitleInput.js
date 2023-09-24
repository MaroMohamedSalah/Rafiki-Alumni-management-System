import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateJobTitle } from "../../redux/actions/jobsActions";

const JobTitleInput = ({ placeholder, label }) => {
	const dispatch = useDispatch();
	const [jobTitle, setJobTitle] = useState("");

	useEffect(() => {
		// Retrieve the job title from sessionStorage on component mount
		const storedJobTitle = sessionStorage.getItem("Job_Title");
		if (storedJobTitle !== null) {
			setJobTitle(storedJobTitle);
		}
	}, []);

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
		setJobTitle(newJobTitle); // Update the local state
	};

	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
			value={jobTitle}
			onChange={handleTitleChange}
		/>
	);
};

export default JobTitleInput;
