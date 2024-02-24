import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import cv from "../imgs/Set As Resume.svg";
import Swal from "sweetalert2";
import Toast from "./Toast";
import { useEffect, useState } from "react";
import { FormHelperText } from "@mui/material/node";
import { baseBackendUrl } from "../utils/baseBackendUrl";
const GenerateCV = () => {
	const [jobTitle, setJobTitle] = useState("");
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add loading state
	const [jobTitleError, setJobTitleError] = useState("");
	const sessionId = localStorage.getItem("sessionId");

	const handelGenerateCv = async () => {
		const englishLetters = /^[A-Za-z\s]+$/;
		if (!jobTitle) {
			setJobTitleError("Please specify a job title.");
			return;
		} else if (!englishLetters.test(jobTitle)) {
			setJobTitleError("Job title must be in only English.");
		} else if (jobTitle.length > 18) {
			setJobTitleError("Job title must be less than 18 characters.");
		} else {
			setJobTitleError("");
			setIsLoading(true); // Show loading indicator
			try {
				const response = await fetch(
					`${baseBackendUrl}/users/generate_cv?Job_Title=${jobTitle}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${sessionId}`,
						},
					}
				);

				if (!response.ok) {
					console.error(`Request failed with status ${response.status}`);
					Toast({
						title: "CV generation failed. Please try again.",
						icon: "error",
					});
				}

				const data = await response.json();

				if (data.success === true) {
					// CV generation was successful
					console.log("CV generated successfully:", data);
					setOpen(false);
					window.open(data.cvUrl, "_blank");
					// Navigate to the generated CV or update the UI as needed
				} else {
					if (data.message === "Missing credentials." && data.missing) {
						if (data.missing.length > 1) {
							setJobTitleError(`${data.missing} sections are missing.`);
						} else {
							setJobTitleError(`${data.missing} section is missing.`);
						}
					} else {
						// Handle other CV generation errors
						console.error("CV generation failed:", data.message);
						Toast({
							title: "CV generation failed. Please try again.",
							icon: "error",
						});
					}
				}
			} catch (error) {
				console.error("Error while generating CV:", error);
				Toast({
					title: "An unexpected error occurred. Please try again later.",
					icon: "error",
				});
			} finally {
				setIsLoading(false); // Hide loading indicator
			}
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<button className="btn GenerateCV" onClick={handleClickOpen}>
				<span className="icon">
					<img src={cv} alt="" />
				</span>{" "}
				Create your own CV
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Job Title</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please specify the job title you'd like to include on your CV.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="Job-title"
						label="Job Title"
						type="text"
						fullWidth
						variant="standard"
						onBlur={(e) => setJobTitle(e.target.value)}
						error={jobTitleError !== ""}
					/>
					<FormHelperText>{jobTitleError}</FormHelperText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handelGenerateCv} disabled={isLoading}>
						{isLoading ? "Generating..." : "Generate CV"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default GenerateCV;
