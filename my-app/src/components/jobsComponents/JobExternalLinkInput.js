import React from "react";
import { TextField } from "@mui/material/node";
import { useSelector, useDispatch } from "react-redux";
import { updateJobExternalLink } from "../../redux/actions/jobsActions";

const JobExternalLinkInput = () => {
	// Get the external link value from Redux store
	const externalLink = useSelector(
		(state) => state.jobs.formData.External_Link
	);

	// Redux dispatch function
	const dispatch = useDispatch();

	// Define the handler for external link change
	const handleExternalLinkChange = (e) => {
		const newExternalLink = e.target.value.trim() || null;
		// Dispatch your Redux action to update the external link in the store
		updateJobExternalLink(dispatch, newExternalLink);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="External Apply Link"
			placeholder="Insert the link that you need to receive applications in"
			fullWidth
			name="External_Link"
			value={externalLink || ""}
			onChange={handleExternalLinkChange}
		/>
	);
};

export default JobExternalLinkInput;
