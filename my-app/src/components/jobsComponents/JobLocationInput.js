import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateJobLocation } from "../../redux/actions/jobsActions";

const JobLocationInput = ({ placeholder }) => {
	const dispatch = useDispatch();
	const location = useSelector((state) => state.jobs.formData.Location);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		missingInputs.includes("Location") ? setHasError(true) : setHasError(false);
	}, [missingInputs]);

	const handleLocationChange = (event) => {
		const newLocation = event.target.value || null;
		updateJobLocation(dispatch, newLocation);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="Location"
			placeholder={placeholder}
			fullWidth
			name="Location"
			value={location || ""}
			onChange={handleLocationChange}
			error={hasError}
			helperText={hasError && "Location is required"}
		/>
	);
};

export default JobLocationInput;
