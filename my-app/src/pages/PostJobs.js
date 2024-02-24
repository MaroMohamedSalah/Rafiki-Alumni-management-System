import "./jobs.css";
import { useEffect, useState } from "react";
import JobTitleInput from "../components/jobsComponents/JobTitleInput";
import { useDispatch, useSelector } from "react-redux";
import JobTypesSelect from "../components/jobsComponents/JobTypesSelect";
import JobCategoriesSelect from "../components/jobsComponents/JobCategoriesSelect";
import JobEduLevelSelect from "../components/jobsComponents/JobEduLevelSelect";
import JobCompanyNameInput from "../components/jobsComponents/JobCompanyNameInput";
import JobCompanyLogoInput from "../components/jobsComponents/JobCompanyLogoInput";
import JobCompanySizeSelect from "../components/jobsComponents/JobCompanySizeSelect";
import JobSalaryInput from "../components/jobsComponents/JobSalaryInput";
import JobLocationInput from "../components/jobsComponents/JobLocationInput";
import JobDescriptionTextarea from "../components/jobsComponents/JobDescriptionTextarea";
import JobRequirementsTextarea from "../components/jobsComponents/JobRequirementsTextarea";
import JobSkillsSelect from "../components/jobsComponents/JobSkillsSelect";
import JobDeadline from "../components/jobsComponents/JobDeadline";
import JobMethodSelection from "../components/jobsComponents/JobMethodSelection";
import JobExternalLinkInput from "../components/jobsComponents/JobExternalLinkInput";
import JobCompanyEmail from "../components/jobsComponents/JobCompanyEmail";
import { Button } from "@mui/material/node";
import Toast from "../components/Toast";
import {
	clearAllJobInputs,
	updateIsIntern,
	updateMissingInput,
} from "../redux/actions/jobsActions";
import JobTimeSelect from "../components/jobsComponents/JobTimeSelect";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const PostJobs = () => {
	const [applyWith, setApplyWith] = useState("WithExternalLink");
	const [missingFields, setMissingFields] = useState([]);
	const formData = useSelector((state) => state.jobs.formData);
	const sessionId = localStorage.getItem("sessionId");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${baseBackendUrl}/jobs/add-job-post`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
			body: JSON.stringify(formData), // Convert the data object to JSON
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
					clearAllJobInputs(dispatch);
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

					// setMissingFields(updatedMissingFields);
					updateMissingInput(dispatch, updatedMissingFields);
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
	};

	useEffect(() => {
		updateIsIntern(dispatch, false);
	}, []);
	// Helper function to check if a field is missing
	return (
		<div className="PostJobs jobs">
			<div className="title mb-4 px-3 px-lg-4">Post Job</div>
			<form action="#" onSubmit={handleSubmit} id="form">
				<div className="row">
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobTitleInput
							label={"Job Title"}
							placeholder={"Enter the job title"}
						/>
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobTypesSelect label={"Job Type"} />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobCategoriesSelect label={"Job Category"} />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobTimeSelect />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobCompanyNameInput />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobCompanyLogoInput />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobCompanySizeSelect />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3 opt">
						<JobSalaryInput />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobLocationInput placeholder={"Enter Job Location"} />
					</div>
					<div className="col-12 col-lg-6 px-lg-5 px-3 my-3">
						<JobEduLevelSelect label={"Education Level"} />
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<JobDescriptionTextarea
							label={"Job Description"}
							placeholder={"Enter a brief job description"}
						/>
					</div>
					<div className="col-12 px-lg-5 px-3 my-3">
						<JobRequirementsTextarea
							placeholder={"Enter the job requirements and specifications..."}
							label={"Job Requirements"}
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
							setApplyWith={setApplyWith}
							applyWith={applyWith}
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

export default PostJobs;
