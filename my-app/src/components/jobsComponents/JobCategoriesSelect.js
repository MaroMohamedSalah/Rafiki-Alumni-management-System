import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	updateJobCategories,
	updateJobCategory,
} from "../../redux/actions/jobsActions";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { baseBackendUrl } from "../../utils/baseBackendUrl";

const JobCategoriesSelect = ({ name, label }) => {
	const [jobCategories, setJobCategories] = useState([]);
	const [selectedJobCategory, setSelectedJobCategory] = useState(null);
	const missingInputs = useSelector((state) => state.jobs.missingInputs);
	const [hasError, setHasError] = useState(false);
	const dispatch = useDispatch();
	const sessionId = localStorage.getItem("sessionId");
	const filter = createFilterOptions();

	useEffect(() => {
		getAllJobCategories();
	}, []);

	const getAllJobCategories = async () => {
		try {
			const response = await fetch(
				`${baseBackendUrl}/jobs/get-job-categories`,
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

	const addJobCategory = (categoryName) => {
		fetch(`${baseBackendUrl}/jobs/add-job-category`, {
			method: "POST",
			body: JSON.stringify({
				Job_Category_Name: categoryName,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Add Job Category failed");
				}
				return res.json();
			})
			.then((data) => {
				if (data.success) {
				} else {
					console.log("error", data.message);
				}
			})
			.catch((err) => console.error("Add Job Category Error:", err));
	};

	const handleCategoryChange = (newValue) => {
		setSelectedJobCategory(newValue); // Always set selectedJobCategory

		if (newValue !== null) {
			// Check if newValue is not null
			updateJobCategory(dispatch, newValue.id);
		} else {
			// Remove the selected category from Redux if it's cleared
			updateJobCategory(dispatch, null);
		}

		// Check if the selected category already exists, and add it if it doesn't
		if (newValue !== null) {
			// Check if newValue is not null
			const isCategoryExisting = jobCategories.some(
				(existingCategory) => existingCategory.id === newValue.id
			);
			if (!isCategoryExisting) {
				addJobCategory(newValue.label);
			}
		}
	};

	useEffect(() => {
		missingInputs.includes("Job_Category_Id")
			? setHasError(true)
			: setHasError(false);
	}, [missingInputs]);

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
					helperText={hasError && "Job category is required"}
					error={hasError}
				/>
			)}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value only if it doesn't exist in the options
				if (inputValue && !filtered.length) {
					return [
						{
							label: inputValue,
						},
					];
				}

				return filtered;
			}}
		/>
	);
};

export default JobCategoriesSelect;
