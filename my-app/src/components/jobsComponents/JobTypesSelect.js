import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateJobType } from "../../redux/actions/jobsActions";
import { isFieldMissing } from "../../redux/reducers/jobsReducer";

const JobTypesSelect = ({ label }) => {
	const jobTypes = ["remote", "onsite", "hybrid"];
	const dispatch = useDispatch();
	let selectedJobType = useSelector((state) => state.jobs.formData.Job_Type);
	if (sessionStorage.getItem("Job_Type")) {
		selectedJobType = sessionStorage.getItem("Job_Type");
	}

	const handleTypeChange = (e) => {
		const newJobType = e.target.value;
		sessionStorage.setItem("Job_Type", newJobType);
		updateJobType(dispatch, newJobType);
	};

	return (
		<TextField
			id="outlined-select"
			select
			label={label}
			value={selectedJobType}
			fullWidth
			name="Job_Type"
			onChange={handleTypeChange}
			// helperText={isFieldMissing("Job_Type") && "Job Type Is Required"}
			// error={isFieldMissing("Job_Type")}
		>
			{jobTypes.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default JobTypesSelect;
