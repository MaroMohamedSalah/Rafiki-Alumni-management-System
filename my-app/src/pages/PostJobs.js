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

const PostJobs = () => {
	const [applyWith, setApplyWith] = useState("");
	const [jobCategories, setJobCategories] = useState([]);
	const [selectedJobCategory, setSelectedJobCategory] = useState([]);

	const jobTypes = ["Remote", "Onsite", "Hybrid", "Full time", "Part time"];
	const careerLevels = ["Senior", "Mid-senior", "Junior", "Team Lead"];
	const skills = ["php", "React", "CSS", "HTML", "Node"];
	const companySizes = [
		"1-10 employees",
		"11-50 employees",
		"51-200 employees",
		"501-1000 employees",
		"1001-5000 employees",
		"5001-10000 employees",
		"10001+ employees",
	];
	const sessionId = localStorage.getItem("sessionId");
	const filter = createFilterOptions();

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
			const categories = data.map((cat) => {
				return cat.Job_Category_Name;
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
	return (
		<div className="PostJobs jobs">
			<div className="title mb-4">Post Job</div>
			<form action="#">
				<div className="row">
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Job Title"
							placeholder="Enter the job title"
							fullWidth
							// helperText="Can't Be Empty"
							// error
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-select "
							select
							label="Job Type"
							defaultValue={jobTypes[0]}
							fullWidth
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
							id="combo-box-demo "
							options={jobCategories}
							renderInput={(params) => (
								<TextField {...params} label="Job Category" />
							)}
							onInputChange={(event, newInputValue) => {
								setSelectedJobCategory(newInputValue);
							}}
							filterOptions={(options, params) => {
								const filtered = filter(options, params);

								const { inputValue } = params;
								// Suggest the creation of a new value
								const isExisting = options.some(
									(option) => inputValue === option.label
								);
								if (inputValue !== "" && !isExisting) {
									filtered.push({
										label: inputValue,
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
							label="Career Level"
							defaultValue={careerLevels[0]}
							fullWidth
						>
							{careerLevels.map((option) => (
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
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-textarea"
							label="Company Logo Link (optional)"
							placeholder="Paste the company logo link"
							fullWidth
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-select "
							select
							label="Company Size"
							defaultValue={companySizes[0]}
							fullWidth
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
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Location"
							placeholder="Enter the job Location"
							fullWidth
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea "
							label="Job Description"
							placeholder="Enter a brief job description"
							fullWidth
							multiline
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
						/>
						{/* <MUIRichTextEditor label="Start typing..." /> */}
					</div>

					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<Autocomplete
							multiple
							id="tags-outlined "
							options={skills}
							getOptionLabel={(option) => option}
							defaultValue={[skills[1]]}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									{...params}
									label="Required Skills"
									placeholder="Enter Skill"
								/>
							)}
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						{window.innerWidth >= 992 ? (
							<DesktopDatePicker
								className="w-100"
								label="Application Deadline (optional)"
							/>
						) : (
							<MobileDatePicker className="w-100" />
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
