import { TextField } from "@mui/material/node";

const JobTitleInput = ({ placeholder, label }) => {
	return (
		<TextField
			id="outlined-textarea "
			label="Job Title"
			placeholder="Enter the job title"
			fullWidth
			name="Job_Title"
			// helperText={isFieldMissing("Job_Title") && "Job Title Is Required"}
			// error={isFieldMissing("Job_Title")}
		/>
	);
};

export default JobTitleInput;
