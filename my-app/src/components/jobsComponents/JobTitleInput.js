import { TextField } from "@mui/material/node";

const JobTitleInput = ({ placeholder, label }) => {
	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
		/>
	);
};

export default JobTitleInput;
