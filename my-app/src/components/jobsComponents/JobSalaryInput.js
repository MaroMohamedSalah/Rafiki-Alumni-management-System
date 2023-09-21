import { TextField } from "@mui/material/node";

const JobSalaryInput = () => {
	return (
		<TextField
			id="outlined-textarea"
			label="Salary (optional)"
			placeholder="Example: $5000"
			fullWidth
			name="Salary"
			value={null}
		/>
	);
};

export default JobSalaryInput;
