import React, { useState } from "react";
import ProfileProgress from "./ProfileProgress";
import { useDispatch } from "react-redux";
import { deleteUserCv, updateProfileCV } from "../redux/actions/profileActions";
import Toast from "./Toast";
import GenerateCV from "./GenerateCV";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import FolderDeleteRoundedIcon from "@mui/icons-material/FolderDeleteRounded";
import axios from "axios"; // Import axios for making API requests
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ProfileCV = ({ cv, actorName }) => {
	const sessionId = window.localStorage.getItem("sessionId");
	const [userCv, setUserCv] = useState(cv);
	const [cvIsLoading, setCvIsLoading] = useState(false);
	const dispatch = useDispatch();

	const handleCvUpload = async (event) => {
		const file = event.target.files[0];

		if (file) {
			setCvIsLoading(true);

			try {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", "ggdkuker");

				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/do6oz83pz/upload`,
					formData
				);

				if (response.status === 200) {
					const { secure_url } = response.data;
					Toast({ title: "CV uploaded", icon: "success" });
					updateProfileCV(dispatch, secure_url);
					setUserCv(secure_url);
					saveCv(secure_url);
				} else {
					console.error("File upload failed:", response.data);
					Toast({ title: "Upload failed", icon: "error" });
				}
			} catch (error) {
				console.error("Error uploading file:", error);
				Toast({ title: "Upload Error", icon: "error" });
			} finally {
				setCvIsLoading(false);
			}
		}
	};

	const saveCv = (cvUrl) => {
		fetch(`${baseBackendUrl}/users/upload_cv`, {
			method: "POST",
			body: JSON.stringify({
				cvUrl: cvUrl,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Upload failed");
				}
				return response.json();
			})
			.then((data) => {
				if (data.success === true) {
					console.log("upload done");
				} else {
					Toast({
						title: data.message,
						icon: "error",
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Toast({
					title: "Upload failed",
					icon: "error",
				});
			});
	};

	const handelDeleteCv = () => {
		fetch(`${baseBackendUrl}/users/delete_cv`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Upload failed");
				}
				return response.json();
			})
			.then((data) => {
				if (data.success) {
					Toast({ title: data.message, icon: "success" });
					deleteUserCv(dispatch);
				} else {
					Toast({ title: data.message, icon: "error" });
				}
			})
			.catch((err) => {
				Toast({ title: "Server error", icon: "error" });
				console.log(err);
			});
	};

	return (
		<section className={"ProfileCV sec"}>
			<h1 className="sec-title position-relative">
				{actorName === "HR" ? "Profile Progress" : "Profile & CV"}

				<Tooltip title="Visibility">
					<div className="visibility position-absolute">
						<i className="fa-solid fa-earth-americas"></i>
					</div>
				</Tooltip>
			</h1>
			<div className="pt-3">
				<ProfileProgress />
				{actorName !== "HR" && (
					<div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
						{cv ? (
							<div className="d-flex align-items-center  w-50">
								<a
									href={userCv}
									target="_blank"
									className="previewCV fw-bold py-2 px-3 btn"
									rel="noreferrer"
								>
									<span className="icon me-2">
										<i class="fa-solid fa-file me-2"></i>
									</span>
									Preview CV
								</a>
								<div className="deleteCV ms-3" onClick={() => handelDeleteCv()}>
									<IconButton aria-label="delete" size="medium">
										<FolderDeleteRoundedIcon fontSize="medium" />
									</IconButton>
								</div>
							</div>
						) : (
							<div className="d-flex justify-content-between align-items-center">
								<input
									type="file"
									accept=".pdf" // Specify the allowed file types
									className="cvFileInput" // Apply your desired CSS class for styling
									onChange={handleCvUpload}
								/>
								{cvIsLoading ? (
									<div className="loading-spinner">
										<CircularProgress color="inherit" />
									</div>
								) : (
									<label htmlFor="cvFileInput w-25" className="uploadCVLabel">
										Upload CV
									</label>
								)}
							</div>
						)}
						<GenerateCV />
					</div>
				)}
			</div>
		</section>
	);
};

export default ProfileCV;
