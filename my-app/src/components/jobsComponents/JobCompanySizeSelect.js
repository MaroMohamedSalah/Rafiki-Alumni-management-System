import { MenuItem, TextField } from "@mui/material/node";

const JobCompanySizeSelect = () => {
	const companySizes = [
		"1-10 employees",
		"11-50 employees",
		"51-200 employees",
		"501-1000 employees",
		"1001-5000 employees",
		"5001-10000 employees",
		"10001+ employees",
	];
	return (
		<TextField
			id="outlined-select "
			select
			label="Company Size"
			defaultValue={companySizes[0]}
			fullWidth
			name="Company_Size"
			// helperText={isFieldMissing("Company_Size") && "Company Size Is Required"}
			// error={isFieldMissing("Company_Size")}
		>
			{companySizes.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};
export default JobCompanySizeSelect;
