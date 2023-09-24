import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobRequirements } from "../../redux/actions/jobsActions";
import { useEffect, useState } from "react";

const JobRequirementsTextarea = ({ label, placeholder }) => {
	const jobRequirements = useSelector(
		(state) => state.jobs.formData.Job_Requirements
	);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);
	const dispatch = useDispatch();
	const [hasError, setHasError] = useState(false);

	const handleRequirementsChange = (e) => {
		const newReqs = e.target.value || null;

		// Check if the new requirements are empty, and remove the entity from sessionStorage if it is
		if (newReqs === null) {
			sessionStorage.removeItem("Job_Reqs");
		} else {
			// Store the requirements in sessionStorage
			sessionStorage.setItem("Job_Reqs", newReqs);
		}

		// Dispatch your Redux action to update the requirements in the store
		updateJobRequirements(dispatch, newReqs);
	};

	// Use useEffect to retrieve the requirements from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the requirements from sessionStorage on component mount
		const storedReqs = sessionStorage.getItem("Job_Reqs");
		if (storedReqs !== null) {
			updateJobRequirements(dispatch, storedReqs); // Update Redux state with the stored value
		}
	}, [dispatch]);

	useEffect(() => {
		// Check for errors and update hasError state
		if (missingInputs.includes("Job_Requirements")) {
			setHasError(true);
		} else {
			setHasError(false);
		}
	}, [missingInputs]);

	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
			multiline
			rows={4}
			value={jobRequirements || ""}
			name={"Job_Requirements"}
			onChange={handleRequirementsChange}
			error={hasError}
			helperText={hasError && "Job requirements is required"}
		/>
	);
};

export default JobRequirementsTextarea;
