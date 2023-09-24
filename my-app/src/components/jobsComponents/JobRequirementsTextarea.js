import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobRequirements } from "../../redux/actions/jobsActions";
import { useEffect } from "react";

const JobRequirementsTextarea = ({ label, placeholder }) => {
	const jobRequirements = useSelector(
		(state) => state.jobs.formData.Job_Requirements
	);
	const dispatch = useDispatch();
	const handelRequirementsChange = (e) => {
		const newReqs = e.target.value || null;

		// Check if the new description is empty, and remove the entity from sessionStorage if it is
		if (newReqs === null) {
			sessionStorage.removeItem("Job_Reqs");
		} else {
			// Store the description in sessionStorage
			sessionStorage.setItem("Job_Reqs", newReqs);
		}

		// Dispatch your Redux action to update the description in the store
		updateJobRequirements(dispatch, newReqs);
	};

	// Use useEffect to retrieve the description from sessionStorage on component mount
	useEffect(() => {
		// Retrieve the description from sessionStorage on component mount
		const storedReqs = sessionStorage.getItem("Job_Reqs");
		if (storedReqs !== null) {
			updateJobRequirements(dispatch, storedReqs); // Update Redux state with the stored value
		}
	}, [dispatch]);
	return (
		<TextField
			id="outlined-textarea "
			label={label}
			placeholder={placeholder}
			fullWidth
			multiline
			rows={4}
			value={jobRequirements || ""}
			name={"Job_Requirements"}
			onChange={handelRequirementsChange}
			// helperText={
			// 	isFieldMissing("Job_Requirements") && "Job Requirements Is Required"
			// }
			// error={isFieldMissing("Job_Requirements")}
		/>
	);
};

export default JobRequirementsTextarea;
