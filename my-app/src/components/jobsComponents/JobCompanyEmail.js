import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateJobCompanyEmail } from "../../redux/actions/jobsActions";
import { validateEmail } from "../../utils/validation";

const JobCompanyEmail = () => {
	// Get the company email value from Redux store
	const companyEmail = useSelector(
		(state) => state.jobs.formData.Company_Email
	);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);

	// Redux dispatch function
	const dispatch = useDispatch();

	const [hasError, setHasError] = useState(false);
	const [errorText, setErrorText] = useState("");

	// Define the handler for company email change
	const handleCompanyEmailChange = (e) => {
		const newCompanyEmail = e.target.value.trim() || null;
		// Dispatch your Redux action to update the company email in the store
		updateJobCompanyEmail(dispatch, newCompanyEmail);

		// Validate the email and set error state
		if (newCompanyEmail && !validateEmail(newCompanyEmail)) {
			setHasError(true);
			setErrorText("Invalid email address");
		} else {
			setHasError(false);
			setErrorText("");
		}
	};

	// Effect to check missing inputs and validate email on component load
	useEffect(() => {
		// Check if Company_Email is missing and set error state
		if (missingInputs.includes("Company_Email")) {
			setHasError(true);
			setErrorText("Applications Email is required");
		} else {
			setHasError(false);
			setErrorText("");
		}

		// Validate the email when the component loads
		if (companyEmail && !validateEmail(companyEmail)) {
			setHasError(true);
			setErrorText("Invalid email address");
		}
	}, [missingInputs, companyEmail]);

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
			error={hasError}
			helperText={hasError && errorText}
		/>
	);
};

export default JobCompanyEmail;
