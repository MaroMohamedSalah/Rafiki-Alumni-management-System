import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobDescription } from "../../redux/actions/jobsActions";

const JobDescriptionTextarea = ({ label, placeholder }) => {
	const dispatch = useDispatch();
	const description = useSelector((state) => state.jobs.formData.Description);

	const handleDescriptionChange = (event) => {
		const newDescription = event.target.value || null;
		updateJobDescription(dispatch, newDescription);
	};

	return (
		<TextField
			id="outlined-textarea"
			label={label}
			placeholder={placeholder}
			fullWidth
			multiline
			name="Description"
			value={description}
			onChange={handleDescriptionChange}
		/>
	);
};

export default JobDescriptionTextarea;
