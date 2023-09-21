import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobCompanyLogo } from "../../redux/actions/jobsActions";

const JobCompanyLogoInput = () => {
	const dispatch = useDispatch();
	const companyLogo = useSelector((state) => state.jobs.formData.Company_Logo);

	const handleLogoChange = (e) => {
		const newCompanyLogo = e.target.value.trim() || null; // Convert empty string to null
		updateJobCompanyLogo(dispatch, newCompanyLogo);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="Company Logo Link (optional)"
			placeholder="Paste the company logo link"
			fullWidth
			name="Company_Logo"
			value={companyLogo || ""}
			onChange={handleLogoChange}
		/>
	);
};

export default JobCompanyLogoInput;
