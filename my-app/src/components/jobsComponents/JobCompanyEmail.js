import { TextField } from "@mui/material/node";

const JobCompanyEmail = () => {
	return (
		<TextField
			id="outlined-textarea "
			label="Applications Email"
			placeholder="Enter the email that you want to receive applications at "
			fullWidth
			type="email"
			name="Company_Email"
			// helperText={
			// 	isFieldMissing("Company_Email") && "Company Email Is Required"
			// }
			// error={isFieldMissing("Company_Email")}
		/>
	);
};

export default JobCompanyEmail;
