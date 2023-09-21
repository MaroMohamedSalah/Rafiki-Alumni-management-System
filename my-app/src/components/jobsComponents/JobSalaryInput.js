import { TextField } from "@mui/material/node";
import { useSelector, useDispatch } from "react-redux";
import { updateJobSalary } from "../../redux/actions/jobsActions";

const JobSalaryInput = () => {
	const dispatch = useDispatch();
	const salary = useSelector((state) => state.jobs.formData.Salary);

	const handleSalaryChange = (e) => {
		const newSalary = e.target.value.trim() || null; // Convert empty string to null
		updateJobSalary(dispatch, newSalary);
	};

	return (
		<TextField
			id="outlined-textarea"
			label="Salary (optional)"
			placeholder="Example: $5000"
			fullWidth
			name="Salary"
			value={salary || ""}
			onChange={handleSalaryChange}
		/>
	);
};

export default JobSalaryInput;
