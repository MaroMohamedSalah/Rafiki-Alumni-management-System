import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobCompanyLogo } from "../../redux/actions/jobsActions";

const JobCompanyLogoInput = () => {
	const dispatch = useDispatch();
	const companyLogo = useSelector((state) => state.jobs.formData.Company_Logo);

	// Use useEffect to retrieve the company logo link from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the company logo link from sessionStorage on component mount
		const storedCompanyLogo = sessionStorage.getItem("Company_Logo");
		if (storedCompanyLogo !== null) {
			updateJobCompanyLogo(dispatch, storedCompanyLogo); // Update Redux state with the stored value
		}
	}, [dispatch]);

	const handleLogoChange = (e) => {
		const newCompanyLogo = e.target.value.trim() || null; // Convert empty string to null

		// Check if the new company logo link is empty, and remove the entity from sessionStorage if it is
		if (newCompanyLogo === null) {
			sessionStorage.removeItem("Company_Logo");
		} else {
			// Store the selected company logo link in sessionStorage
			sessionStorage.setItem("Company_Logo", newCompanyLogo);
		}

		// Dispatch your Redux action to update the company logo link in the store
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
