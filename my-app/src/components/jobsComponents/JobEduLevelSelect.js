import { MenuItem, TextField } from "@mui/material/node";
import { useDispatch, useSelector } from "react-redux";
import { updateJobEduLevel } from "../../redux/actions/jobsActions";
const JobEduLevelSelect = ({ name }) => {
	// Define your education levels array
	const eduLevels = ["graduate", "undergraduate", "both"];

	// Redux dispatch function
	const dispatch = useDispatch();

	// Define the handler for education level change
	const handleEducationLevelChange = (e) => {
		const newEducationLevel = e.target.value;
		// Dispatch your Redux action to update the education level in the store
		updateJobEduLevel(dispatch, newEducationLevel);
	};

	return (
		<TextField
			id="outlined-select"
			select
			label={"Education Level"}
			defaultValue={eduLevels[0]}
			fullWidth
			name={name}
			onBlur={(e) => handleEducationLevelChange(e)}
			// helperText={
			// 	isFieldMissing("Education_Level") && "Job Education Level Is Required"
			// }
			// error={isFieldMissing("Education_Level")}
		>
			{eduLevels.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default JobEduLevelSelect;
