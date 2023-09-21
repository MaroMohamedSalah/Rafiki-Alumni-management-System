import { TextField } from "@mui/material/node";

const JobCompanyLogoInput = () => {
	return (
		<TextField
			id="outlined-textarea"
			label="Company Logo Link (optional)"
			placeholder="Paste the company logo link"
			fullWidth
			name="Company_Logo"
		/>
	);
};

export default JobCompanyLogoInput;
