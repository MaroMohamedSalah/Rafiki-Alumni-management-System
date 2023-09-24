import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateJobType } from "../../redux/actions/jobsActions";
import { isFieldMissing } from "../../redux/reducers/jobsReducer";

const JobTimeSelect = () => {
	const jobTimes = ["Full-time", "Part-time"];
	const dispatch = useDispatch();
	let selectedJobTime = useSelector((state) => state.jobs.formData.Job_Time);
	if (sessionStorage.getItem("Job_Time")) {
		selectedJobTime = sessionStorage.getItem("Job_Time");
	}

	const handleTimeChange = (e) => {
		const newJobTime = e.target.value;
		sessionStorage.setItem("Job_Time", newJobTime);
		updateJobType(dispatch, newJobTime);
	};

	return (
		<TextField
			id="outlined-select"
			select
			label={"Job Time"}
			value={selectedJobTime}
			fullWidth
			name="Job_Time"
			onChange={handleTimeChange}
			// helperText={isFieldMissing("Job_Type") && "Job Type Is Required"}
			// error={isFieldMissing("Job_Type")}
		>
			{jobTimes.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default JobTimeSelect;
