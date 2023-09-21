import { TextField } from "@mui/material/node";

const JobDescriptionTextarea = ({ label, placeholder }) => {
	return (
		<TextField
			id="outlined-textarea "
			label={label}
			placeholder={placeholder}
			fullWidth
			multiline
			name="Description"
			// helperText={isFieldMissing("Description") && "Description Is Required"}
			// error={isFieldMissing("Description")}
		/>
	);
};

export default JobDescriptionTextarea;
