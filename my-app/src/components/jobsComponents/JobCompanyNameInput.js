// JobCompanyNameInput.js
import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobCompanyName } from "../../redux/actions/jobsActions";

const JobCompanyNameInput = () => {
	const dispatch = useDispatch();
	const companyName = useSelector((state) => state.jobs.formData.Company_Name);

	const handleNameChange = (e) => {
		const newCompanyName = e.target.value.trim() || null; // Convert empty string to null
		updateJobCompanyName(dispatch, newCompanyName);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="Company Name"
			placeholder="Enter the company name"
			fullWidth
			name="Company_Name"
			value={companyName || ""}
			onChange={handleNameChange}
		/>
	);
};

export default JobCompanyNameInput;
