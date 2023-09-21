import { TextField } from "@mui/material/node";

const JobLocationInput = ({ placeholder }) => {
	return (
		<TextField
			id="outlined-textarea "
			label="Location"
			placeholder={placeholder}
			fullWidth
			name="Location"
			// helperText={isFieldMissing("Location") && "Location Is Required"}
			// error={isFieldMissing("Location")}
		/>
	);
};

export default JobLocationInput;
