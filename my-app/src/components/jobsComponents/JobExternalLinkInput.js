import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateJobExternalLink } from "../../redux/actions/jobsActions";
import { validateURL } from "../../utils/validation";

const JobExternalLinkInput = () => {
	// Get the external link value from Redux store
	const externalLink = useSelector(
		(state) => state.jobs.formData.External_Link
	);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);

	// Redux dispatch function
	const dispatch = useDispatch();

	const [hasError, setHasError] = useState(false);
	const [errorText, setErrorText] = useState("");

	// Define the handler for external link change
	const handleExternalLinkChange = (e) => {
		const newExternalLink = e.target.value.trim() || null;
		// Dispatch your Redux action to update the external link in the store
		updateJobExternalLink(dispatch, newExternalLink);

		// Validate the URL and set error state
		if (newExternalLink && !validateURL(newExternalLink)) {
			setHasError(true);
			setErrorText("Invalid URL");
		} else {
			setHasError(false);
			setErrorText("");
		}
	};

	// Effect to check missing inputs and validate URL on component load
	useEffect(() => {
		// Check if External_Link is missing and set error state
		if (missingInputs.includes("External_Link")) {
			setHasError(true);
			setErrorText("External Link is required");
		} else {
			setHasError(false);
			setErrorText("");
		}

		// Validate the URL when the component loads
		if (externalLink && !validateURL(externalLink)) {
			setHasError(true);
			setErrorText("Invalid URL");
		}
	}, [missingInputs, externalLink]);

	return (
		<TextField
			id="outlined-textarea"
			label="External Apply Link"
			placeholder="Insert the link that you need to receive applications in"
			fullWidth
			name="External_Link"
			value={externalLink || ""}
			onChange={handleExternalLinkChange}
			error={hasError}
			helperText={hasError && errorText}
		/>
	);
};

export default JobExternalLinkInput;
