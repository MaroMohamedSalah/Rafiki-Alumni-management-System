import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobCompanyName } from "../../redux/actions/jobsActions";

const JobCompanyNameInput = () => {
	const dispatch = useDispatch();
	const companyName = useSelector((state) => state.jobs.formData.Company_Name);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);
	const [hasError, setHasError] = useState(false);

	// Use useEffect to retrieve the company name from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the company name from sessionStorage on component mount
		const storedCompanyName = sessionStorage.getItem("Company_Name");
		if (storedCompanyName !== null) {
			updateJobCompanyName(dispatch, storedCompanyName); // Update Redux state with the stored value
		}
	}, [dispatch]);

	const handleNameChange = (e) => {
		const newCompanyName = e.target.value || null; // Convert empty string to null

		// Check if the new company name is empty, and remove the entity from sessionStorage if it is
		if (newCompanyName === null) {
			sessionStorage.removeItem("Company_Name");
		} else {
			// Store the selected company name in sessionStorage
			sessionStorage.setItem("Company_Name", newCompanyName);
		}

		// Dispatch your Redux action to update the company name in the store
		updateJobCompanyName(dispatch, newCompanyName);
	};

	useEffect(() => {
		missingInputs.includes("Company_Name")
			? setHasError(true)
			: setHasError(false);
	}, [missingInputs]);

	return (
		<TextField
			id="outlined-textarea"
			label="Company Name"
			placeholder="Enter the company name"
			fullWidth
			name="Company_Name"
			value={companyName || ""}
			onChange={handleNameChange}
			error={hasError}
			helperText={hasError && "Company name is required"}
		/>
	);
};

export default JobCompanyNameInput;
