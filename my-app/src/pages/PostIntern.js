import { Button, TextField } from "@mui/material/node";
import "./jobs.css";
import { useState } from "react";
import JobTitleInput from "../components/jobsComponents/JobTitleInput";
import JobTypesSelect from "../components/jobsComponents/JobTypesSelect";
import JobCategoriesSelect from "../components/jobsComponents/JobCategoriesSelect";
import JobEduLevelSelect from "../components/jobsComponents/JobEduLevelSelect";
import JobCompanyNameInput from "../components/jobsComponents/JobCompanyNameInput";
import JobCompanyLogoInput from "../components/jobsComponents/JobCompanyLogoInput";
import JobSalaryInput from "../components/jobsComponents/JobSalaryInput";
import JobDescriptionTextarea from "../components/jobsComponents/JobDescriptionTextarea";
import JobRequirementsTextarea from "../components/jobsComponents/JobRequirementsTextarea";
import JobSkillsSelect from "../components/jobsComponents/JobSkillsSelect";
import JobDeadline from "../components/jobsComponents/JobDeadline";
import JobMethodSelection from "../components/jobsComponents/JobMethodSelection";
import JobExternalLinkInput from "../components/jobsComponents/JobExternalLinkInput";
import JobCompanyEmail from "../components/jobsComponents/JobCompanyEmail";
import JobDurationInput from "../components/jobsComponents/JobDurationInput";

const PostIntern = () => {
	const [applyWith, setApplyWith] = useState("WithExternalLink");

	return (
		<div className="PostIntern jobs">
			<div className="title mb-4">Post Internship</div>
			<form action="#">
				<div className="row">
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobTitleInput
							label={"Internship Title"}
							placeholder={"Enter the internship title"}
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobTypesSelect label={"Internship Type"} />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobCategoriesSelect label={"Internship Category"} />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobEduLevelSelect />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobCompanyNameInput />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobCompanyLogoInput />
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<TextField
							id="outlined-textarea"
							label="Location"
							placeholder="Enter the job Location"
							fullWidth
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobSalaryInput />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobDurationInput />
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<JobDescriptionTextarea label={"Internship Description"} />
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<JobRequirementsTextarea
							placeholder={
								"Enter the internship requirements and specifications..."
							}
						/>
					</div>

					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobSkillsSelect />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobDeadline />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobMethodSelection
							applyWith={applyWith}
							setApplyWith={setApplyWith}
						/>
					</div>
					{applyWith === "WithExternalLink" ? (
						<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
							<JobExternalLinkInput />
						</div>
					) : (
						<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
							<JobCompanyEmail />
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

export default PostIntern;
