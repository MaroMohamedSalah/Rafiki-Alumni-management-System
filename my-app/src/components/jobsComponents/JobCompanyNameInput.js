import { TextField } from "@mui/material/node";

const JobCompanyNameInput = () => {
	return (
		<TextField
			id="outlined-textarea "
			label="Company Name"
			placeholder="Enter the company name"
			fullWidth
			name="Company_Name"
			// helperText={
			// 	isFieldMissing("Company_Name") && "Company Name Is Required"
			// }
			// error={isFieldMissing("Company_Name")}
		/>
	);
};

export default JobCompanyNameInput;
