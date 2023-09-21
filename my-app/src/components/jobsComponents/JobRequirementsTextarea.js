import { TextField } from "@mui/material/node";

const JobRequirementsTextarea = ({ name, label, placeholder }) => {
	return (
		<TextField
			id="outlined-textarea "
			label={label}
			placeholder={placeholder}
			fullWidth
			multiline
			rows={4}
			name={name}
			// helperText={
			// 	isFieldMissing("Job_Requirements") && "Job Requirements Is Required"
			// }
			// error={isFieldMissing("Job_Requirements")}
		/>
	);
};

export default JobRequirementsTextarea;
