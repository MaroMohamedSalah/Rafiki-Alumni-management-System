import { MenuItem, TextField } from "@mui/material/node";
import { useSelector, useDispatch } from "react-redux";
import { updateJobCompanySize } from "../../redux/actions/jobsActions";

const JobCompanySizeSelect = () => {
	const dispatch = useDispatch();
	const companySize = useSelector((state) => state.jobs.formData.Company_Size);

	const handleSizeChange = (e) => {
		const newCompanySize = e.target.value.trim() || null; // Convert empty string to null
		updateJobCompanySize(dispatch, newCompanySize);
	};

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
			id="outlined-select"
			select
			label="Company Size"
			defaultValue={companySize || ""}
			fullWidth
			name="Company_Size"
			onChange={handleSizeChange}
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
