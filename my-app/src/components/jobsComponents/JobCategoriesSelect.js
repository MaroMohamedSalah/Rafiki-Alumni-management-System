import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	updateJobCategories,
	updateJobCategory,
} from "../../redux/actions/jobsActions";
import { createFilterOptions } from "@mui/material/Autocomplete";

const JobCategoriesSelect = ({ name, label }) => {
	const [jobCategories, setJobCategories] = useState([]);
	const [selectedJobCategory, setSelectedJobCategory] = useState(null);
	const dispatch = useDispatch();
	const sessionId = localStorage.getItem("sessionId");
	const filter = createFilterOptions();

	useEffect(() => {
		getAllJobCategories();
	}, []);

	const getAllJobCategories = async () => {
		try {
			const response = await fetch(
				"https://rafiki-backend.azurewebsites.net/api/jobs/get-job-categories",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${sessionId}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const data = await response.json();
			const categories = data.map((cat) => ({
				label: cat.Job_Category_Name,
				id: cat.Job_Category_Id,
			}));
			setJobCategories(categories);
		} catch (error) {
			console.error("Error while fetching job categories:", error);
		}
	};

	const handleCategoryChange = (newValue) => {
		setSelectedJobCategory(newValue);
		if (newValue) {
			updateJobCategory(dispatch, newValue.id);
		} else {
			// Remove the selected category from Redux if it's cleared
			updateJobCategory(dispatch, null);
		}
	};

	const isFieldMissing = useSelector((state) =>
		state.jobs.missingInputs.includes("Job_Category")
	);

	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={jobCategories}
			getOptionLabel={(option) => option.label}
			value={selectedJobCategory}
			onChange={(_, newValue) => handleCategoryChange(newValue)}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					name="Job_Category"
					helperText={isFieldMissing && "Job Category Is Required"}
					error={isFieldMissing}
				/>
			)}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);
				return filtered;
			}}
		/>
	);
};

export default JobCategoriesSelect;
