import React from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobTitle } from "../../redux/actions/jobsActions";

const JobTitleInput = ({ placeholder, label }) => {
	const dispatch = useDispatch();
	const jobTitle = useSelector((state) => state.jobs.formData.Job_Title);

	const handleTitleChange = (e) => {
		const newJobTitle = e.target.value || null; // Convert empty string to null
		updateJobTitle(dispatch, newJobTitle);
	};

	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
			value={jobTitle} // Use the value from the Redux store, or an empty string if null
			onChange={handleTitleChange}
		/>
	);
};

export default JobTitleInput;
