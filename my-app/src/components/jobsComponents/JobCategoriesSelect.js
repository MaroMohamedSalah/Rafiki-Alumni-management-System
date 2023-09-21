import { Autocomplete, TextField } from "@mui/material/node";
import {
	updateJobCategories,
	updateJobCategory,
} from "../../redux/actions/jobsActions";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { createFilterOptions } from "@mui/material/node/Autocomplete";
import { useEffect, useState } from "react";

const JobCategoriesSelect = ({ name, label }) => {
	const [jobCategories, setJobCategories] = useState(null);
	const [selectedJobCategory, setSelectedJobCategory] = useState(null);

	const dispatch = useDispatch();
	const handleCategoryChange = (cat) => {
		setSelectedJobCategory(cat);
		if (cat.id) {
			updateJobCategory(dispatch, cat.id);
		}
	};

	const sessionId = localStorage.getItem("sessionId");

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
				// Handle non-200 HTTP status codes here
				throw new Error(`Request failed with status ${response.status}`);
			}

			const data = await response.json();
			console.log(data);
			const categories = data.map((cat) => {
				return {
					label: cat.Job_Category_Name, // Use Job_Category_Name as the label (name)
					id: cat.Job_Category_Id, // Use Job_Category_Id as the ID
				};
			});
			setJobCategories(categories);

			// Return the data or use it as needed
			return data;
		} catch (error) {
			// Handle any network or unexpected errors here
			console.error("Error while fetching job categories:", error);
			throw error; // Rethrow the error to propagate it further if needed
		}
	};
	const addNewJobCategory = async (categoryName) => {
		try {
			const response = await fetch(
				"https://rafiki-backend.azurewebsites.net/api/jobs/add-job-category",
				{
					method: "POST",
					body: JSON.stringify({
						Job_Category_Name: capitalizeFirstLetter(categoryName),
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${sessionId}`,
					},
				}
			);

			if (!response.ok) {
				// Handle non-200 HTTP status codes here
				throw new Error(`Request failed with status ${response.status}`);
			}

			const data = await response.json();

			// Return the data or use it as needed
			return data;
		} catch (error) {
			// Handle any network or unexpected errors here
			console.error("Error while adding job categories:", error);
			throw error; // Rethrow the error to propagate it further if needed
		}
	};

	useEffect(() => {
		getAllJobCategories();
	}, []);
	const filter = createFilterOptions();
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={jobCategories}
			getOptionLabel={(option) => option.label}
			value={selectedJobCategory}
			onChange={(event, newValue) => handleCategoryChange(newValue)}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					name={"Job_Category"}
					// helperText={
					// 	isFieldMissing("Job_Category") && "Job Job Category Is Required"
					// }
					// error={isFieldMissing("Job_Category")}
				/>
			)}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some(
					(option) => inputValue === option.label
				);
				if (inputValue !== "" && !isExisting) {
					// Use the category name as the unique key
					const uniqueKey = inputValue;
					filtered.push({
						label: inputValue,
						id: uniqueKey,
					});
				}

				return filtered;
			}}
		/>
	);
};

export default JobCategoriesSelect;
