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

const PostJobs = () => {
	const [applyWith, setApplyWith] = useState("");

	const jobTypes = ["Remote", "Onsite", "Hybrid", "Full time", "Part time"];
	const careerLevels = ["Senior", "Mid-senior", "Junior", "Team Lead"];
	const skills = ["php", "React", "CSS", "HTML", "Node"];

	return (
		<div className="PostJobs jobs">
			<div className="title mb-4">Post Job</div>
			<form action="#">
				<div className="row">
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea"
							label="Job Title"
							placeholder="Enter the job title"
							fullWidth
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-select"
							select
							label="Job Type"
							defaultValue="Remote"
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
						<TextField
							id="outlined-select"
							select
							label="Job Category"
							defaultValue="Front End"
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
						<TextField
							id="outlined-select"
							select
							label="Career Level"
							defaultValue="Junior"
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
							id="outlined-textarea"
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
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-textarea"
							label="Salary (optional)"
							placeholder="Example: $5000"
							fullWidth
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<TextField
							id="outlined-textarea"
							label="Location (optional)"
							placeholder="Enter the job Location"
							fullWidth
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea"
							label="Job Description"
							placeholder="Enter a brief job description"
							fullWidth
							multiline
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea"
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
							id="tags-outlined"
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
						<FormControl>
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
								id="outlined-textarea"
								label="External Apply Link"
								placeholder="Insert the link that you need to receive applications in"
								fullWidth
							/>
						</div>
					) : (
						<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
							<TextField
								id="outlined-textarea"
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
