import React from "react";
import { TextField } from "@mui/material/node";
import { useSelector, useDispatch } from "react-redux";
import { updateJobCompanyEmail } from "../../redux/actions/jobsActions";

const JobCompanyEmail = () => {
	// Get the company email value from Redux store
	const companyEmail = useSelector(
		(state) => state.jobs.formData.Company_Email
	);

	// Redux dispatch function
	const dispatch = useDispatch();

	// Define the handler for company email change
	const handleCompanyEmailChange = (e) => {
		const newCompanyEmail = e.target.value.trim() || null;
		// Dispatch your Redux action to update the company email in the store
		updateJobCompanyEmail(dispatch, newCompanyEmail);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="Applications Email"
			placeholder="Enter the email that you want to receive applications at"
			fullWidth
			type="email"
			name="Company_Email"
			value={companyEmail || ""}
			onChange={handleCompanyEmailChange}
		/>
	);
};

export default JobCompanyEmail;
