import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobLocation } from "../../redux/actions/jobsActions";

const JobLocationInput = ({ placeholder }) => {
	const dispatch = useDispatch();
	const location = useSelector((state) => state.jobs.formData.Location);

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
			value={location}
			onChange={handleLocationChange}
		/>
	);
};

export default JobLocationInput;
