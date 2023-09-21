import { TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobTitle } from "../../redux/actions/jobsActions";
import { isFieldMissing } from "../../redux/reducers/jobsReducer";

const JobTitleInput = ({ placeholder, label, name }) => {
	const dispatch = useDispatch();
	// const missingInputs = useSelector((state) => state.jobs.missingInputs);

	const handleTitleChange = (e) => {
		const newJobTitle = e.target.value;
		updateJobTitle(dispatch, newJobTitle);
	};

	return (
		<TextField
			id="outlined-textarea "
			label={label}
			placeholder={placeholder}
			fullWidth
			name={"Job_Title"}
			onBlur={(e) => handleTitleChange(e)}
			// helperText={
			// 	isFieldMissing(missingInputs, "Job_Title") && "Job Title Is Required"
			// }
			// error={isFieldMissing(missingInputs, "Job_Title")}
		/>
	);
};

export default JobTitleInput;
