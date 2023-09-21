import {
	Autocomplete,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material/node";
import "./jobs.css";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { createFilterOptions } from "@mui/material/node/Autocomplete";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import Toast from "../components/Toast";
import JobTitleInput from "../components/jobsComponents/JobTitleInput";

const PostJobs = () => {
	const [applyWith, setApplyWith] = useState("");
	const [jobCategories, setJobCategories] = useState(null);
	const [selectedJobCategory, setSelectedJobCategory] = useState(null);
	const [skills, setSkills] = useState([{ label: "", id: "" }]);
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [missingFields, setMissingFields] = useState([]);

	const jobTypes = ["remote", "onsite", "hybrid"];
	const companySizes = [
		"1-10 employees",
		"11-50 employees",
		"51-200 employees",
		"501-1000 employees",
		"1001-5000 employees",
		"5001-10000 employees",
		"10001+ employees",
	];
	const eduLevels = ["graduate", "undergraduate", "both"];
	const sessionId = localStorage.getItem("sessionId");
	const filter = createFilterOptions();

	const handleSkillChange = (event, newValue) => {
		setSelectedSkills(newValue);
	};
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const handleCategoryChange = (cat) => {
		setSelectedJobCategory(cat);
	};
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

	const getSkills = () => {
		fetch("https://rafiki-backend.azurewebsites.net/api/skills/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Upload failed");
				}
				return res.json();
			})
			.then((data) => {
				if (data.success) {
					let skills = data.skills.map((e) => ({
						label: e.Skill_Name,
						id: e.Skill_Id,
					}));

					setSkills(skills);
				}
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formElement = e.target; // Get the form element
		const formData = new FormData(formElement);
		const arrayOfSkillsId = selectedSkills.map((skill) => skill.id);

		if (selectedDate) {
			const applicationDeadline = `${selectedDate.$D}-${selectedDate.$M + 1}-${
				selectedDate.$y
			}`;

			formData.append("Application_Deadline", applicationDeadline);
		}

		const missingFields = []; // Initialize the missingFields array

		if (formData.get("External_Link") === "") {
			missingFields.push("External_Link"); // Add field name to missingFields array
		}
		if (formData.get("Company_Email") === "") {
			missingFields.push("Company_Email"); // Add field name to missingFields array
		}
		if (selectedJobCategory === null) {
			missingFields.push("Job_Category");
		}
		setMissingFields(missingFields);

		// Create the data object
		const postData = {
			Job_Title: formData.get("Job_Title"),
			Description: formData.get("Description"),
			Company_Name: formData.get("Company_Name"),
			Company_Logo: formData.get("Company_Logo"),
			Contact_Info: "test",
			Company_Email: "test",
			Company_Size: formData.get("Company_Size"),
			External_Link: formData.get("External_Link"),
			Location: formData.get("Location"),
			Application_Deadline: formData.get("Application_Deadline"),
			Job_Category_Id: selectedJobCategory ? selectedJobCategory.id : null, // Use the selected category ID if available, otherwise set to null
			Salary: +formData.get("Salary"),
			isInternship: false, // Update with the correct value
			Duration: null, // Update with the correct value
			Job_Type: formData.get("Job_Type"),
			Education_Level: formData.get("Education_Level"),
			Job_Skills: arrayOfSkillsId,
		};

		if (missingFields.length === 0) {
			fetch("https://rafiki-backend.azurewebsites.net/api/jobs/add-job-post", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
				body: JSON.stringify(postData), // Convert the data object to JSON
			})
				.then((res) => {
					if (res.status === 400) {
						Toast({ title: "Please Fill All Required Fields", icon: "error" });
					} else if (!res.ok) {
						Toast({
							title: "An error occurred while submitting the form",
							icon: "error",
						});
						throw new Error("Add Post Field");
					}
					return res.json();
				})
				.then((data) => {
					if (data.job_post_created) {
						Toast({ title: "Job Post Added Successfully.", icon: "success" });
						// Clear the form or redirect to a success page if needed
						formElement.reset();
						setSelectedSkills([]); // Clear selected skills
						setSelectedDate(null); // Clear selected date
					} else if (data.missing_fields) {
						// Ensure missing_fields is an array of unique field names
						const uniqueMissingFields = [...new Set(data.missing_fields)];

						// Combine the new array with the existing missingFields array
						const updatedMissingFields = [
							...missingFields,
							...uniqueMissingFields,
						];

						Toast({
							title: "Please Fill All Required Fields",
							icon: "error",
						});

						setMissingFields(updatedMissingFields);
					} else {
						Toast({
							title: "Job Post Failed. Please try again later.",
							icon: "error",
						});
					}
				})
				.catch((error) => {
					if (error.request) {
						Toast({ title: "Check Your Network and try again", icon: "error" });
					} else {
						Toast({ title: "Please Try Again Later", icon: "error" });
					}
				});
		} else {
			Toast({ title: "Please Fill All Required Fields", icon: "error" });
		}
	};

	useEffect(() => {
		getAllJobCategories();
		getSkills();
	}, []);
	// Helper function to check if a field is missing
	const isFieldMissing = (fieldName) => missingFields.includes(fieldName);
	return (
		<div className="PostJobs jobs">
			<div className="title mb-4">Post Job</div>
			<form action="#" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Job Title"
							placeholder="Enter the job title"
							fullWidth
							name="Job_Title"
							helperText={
								isFieldMissing("Job_Title") && "Job Title Is Required"
							}
							error={isFieldMissing("Job_Title")}
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-select "
							select
							label="Job Type"
							defaultValue={jobTypes[0]}
							fullWidth
							name="Job_Type"
							helperText={isFieldMissing("Job_Type") && "Job Type Is Required"}
							error={isFieldMissing("Job_Type")}
						>
							{jobTypes.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
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
									label="Job Category"
									name="Job_Category"
									helperText={
										isFieldMissing("Job_Category") &&
										"Job Job Category Is Required"
									}
									error={isFieldMissing("Job_Category")}
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
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-select "
							select
							label="Education Level"
							defaultValue={eduLevels[0]}
							fullWidth
							name="Education_Level"
							helperText={
								isFieldMissing("Education_Level") &&
								"Job Education Level Is Required"
							}
							error={isFieldMissing("Education_Level")}
						>
							{eduLevels.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Company Name"
							placeholder="Enter the company name"
							fullWidth
							name="Company_Name"
							helperText={
								isFieldMissing("Company_Name") && "Company Name Is Required"
							}
							error={isFieldMissing("Company_Name")}
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-textarea"
							label="Company Logo Link (optional)"
							placeholder="Paste the company logo link"
							fullWidth
							name="Company_Logo"
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-select "
							select
							label="Company Size"
							defaultValue={companySizes[0]}
							fullWidth
							name="Company_Size"
							helperText={
								isFieldMissing("Company_Size") && "Company Size Is Required"
							}
							error={isFieldMissing("Company_Size")}
						>
							{companySizes.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-textarea"
							label="Salary (optional)"
							placeholder="Example: $5000"
							fullWidth
							name="Salary"
							value={null}
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Location"
							placeholder="Enter the job Location"
							fullWidth
							name="Location"
							helperText={isFieldMissing("Location") && "Location Is Required"}
							error={isFieldMissing("Location")}
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Job Description"
							placeholder="Enter a brief job description"
							fullWidth
							multiline
							name="Description"
							helperText={
								isFieldMissing("Description") && "Description Is Required"
							}
							error={isFieldMissing("Description")}
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Job Requirements"
							placeholder="Enter the job requirements and specifications..."
							fullWidth
							multiline
							rows={4}
							name="Job_Requirements"
							helperText={
								isFieldMissing("Job_Requirements") &&
								"Job Requirements Is Required"
							}
							error={isFieldMissing("Job_Requirements")}
						/>
						{/* <MUIRichTextEditor label="Start typing..." /> */}
					</div>

					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						{skills && (
							<Autocomplete
								multiple
								id="tags-outlined"
								options={skills}
								getOptionLabel={(option) => option.label}
								value={selectedSkills} // Set the selected skills
								onChange={handleSkillChange} // Update selected skills on change
								filterSelectedOptions
								renderInput={(params) => (
									<TextField
										{...params}
										label="Required Skills"
										placeholder="Enter Skill"
										name="Job_Skill"
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
										filtered.push({
											label: capitalizeFirstLetter(inputValue),
										});
									}

									return filtered;
								}}
							/>
						)}
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						{window.innerWidth >= 992 ? (
							<DesktopDatePicker
								className="w-100"
								label="Application Deadline (optional)"
								value={selectedDate} // Set the selected date
								onChange={handleDateChange} // Update selected date on change
								format="DD/MM/YYYY"
							/>
						) : (
							<MobileDatePicker
								className="w-100"
								name="Application_Deadline"
								value={selectedDate}
								onChange={handleDateChange}
								format="DD/MM/YYYY"
							/>
						)}
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<FormControl id="">
							<FormLabel id="demo-radio-buttons-group-label">
								How would you like to receive applications?
							</FormLabel>
							<RadioGroup
								aria-labelledby="demo-radio-buttons-group-label"
								name="radio-buttons-group"
								onChange={(e) => setApplyWith(e.target.value)}
							>
								<FormControlLabel
									value="WithExternalLink"
									control={<Radio />}
									label="Receive applications via an external link"
								/>
								<FormControlLabel
									value="WithRafikiSystem"
									control={<Radio />}
									label="Receive applications via Rafiki (our system)"
								/>
							</RadioGroup>
						</FormControl>
					</div>
					{applyWith === "WithExternalLink" ? (
						<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
							<TextField
								id="outlined-textarea "
								label="External Apply Link"
								placeholder="Insert the link that you need to receive applications in"
								fullWidth
								name="External_Link"
								helperText={
									isFieldMissing("External_Link") &&
									"Application Link Is Required"
								}
								error={isFieldMissing("External_Link")}
							/>
						</div>
					) : (
						<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
							<TextField
								id="outlined-textarea "
								label="Applications Email"
								placeholder="Enter the email that you want to receive applications at "
								fullWidth
								type="email"
								name="Company_Email"
								helperText={
									isFieldMissing("Company_Email") && "Company Email Is Required"
								}
								error={isFieldMissing("Company_Email")}
							/>
						</div>
					)}
					<div className="col-12 px-lg-5 px-3 my-3">
						<h5 className="mb-3" style={{ fontSize: "14px" }}>
							<span className="text-danger">*</span> Please review the job
							information before posting
						</h5>
					</div>
					<div className="col-12 col-lg-2 px-lg-5 px-3 pb-3">
						<Button
							variant="contained"
							size="large"
							className="submit px-lg-5 px-3 fs-5"
							type="submit"
							fullWidth
						>
							Post
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PostJobs;
