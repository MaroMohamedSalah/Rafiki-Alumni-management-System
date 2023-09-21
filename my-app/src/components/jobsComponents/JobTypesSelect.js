import { MenuItem, TextField } from "@mui/material/node";
import { updateJobType } from "../../redux/actions/jobsActions";
import { useDispatch } from "react-redux";

const JobTypesSelect = ({ label, name }) => {
	const jobTypes = ["remote", "onsite", "hybrid"];
	const dispatch = useDispatch();
	const handleTypeChange = (e) => {
		const newJobType = e.target.value;
		updateJobType(dispatch, newJobType);
	};
	return (
		<TextField
			id="outlined-select "
			select
			label={label}
			defaultValue={jobTypes[0]}
			fullWidth
			name={name}
			onBlur={(e) => handleTypeChange(e)}
			// helperText={isFieldMissing("Job_Type") && "Job Type Is Required"}
			// error={isFieldMissing("Job_Type")}
		>
			{jobTypes.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default JobTypesSelect;
