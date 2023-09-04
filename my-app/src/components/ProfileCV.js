import ProfileProgress from "./ProfileProgress";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { updateProfileCV } from "../redux/actions/profileActions";
import Toast from "./Toast";
import GenerateCV from "./GenerateCV";
import { CloudinaryUploadWidget } from "react-cloudinary-uploader";
import { Tooltip } from "@mui/material";

const ProfileCV = ({ cv }) => {
	const sessionId = window.localStorage.getItem("sessionId");
	const [userCv, setUserCv] = useState(cv);
	const [cvIsLoading, setCvIsLoading] = useState(false);
	const dispatch = useDispatch();

	const handleUploadSuccess = (info) => {
		setCvIsLoading(true);
		fetch(
			"https://alumni-system-backend.azurewebsites.net/api/users/upload_cv",
			{
				method: "POST",
				body: JSON.stringify({
					cvUrl: info.secure_url,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			}
		)
			.then((response) => {
				if (!response.ok) {
					Toast({ title: "Upload failed", icon: "error" });
					throw new Error("Upload failed");
				}
				return response.json();
			})
			.then((data) => {
				// Handle the server response
				if (data.success === true) {
					Toast({ title: "CV uploaded", icon: "success" });
					updateProfileCV(dispatch, data.CV);
					setCvIsLoading(false);
					setUserCv(data.CV);
				} else {
					Toast({ title: data.message, icon: "error" });
				}
			})
			.catch((error) => {
				// Handle errors
				Toast({ title: error, icon: "error" });
			});
	};

	const handleUploadFailure = (error) => {
		console.error("Upload error:", error);
		Toast({ title: "Upload Error", icon: "error" });
	};

	const cvUploaderOptions = {
		clientAllowedFormats: ["pdf"],
		// max file size is 10MB
		maxFileSize: 10000000,
		// foler to upload to is cvs
		folder: "cvs",
		sources: ["local", "url", "google_drive"],
	};

	return (
		<section className={"ProfileCV sec"}>
			<h1 className="sec-title position-relative">
				Profile & CV
				<Tooltip title="Visibility">
					<div className="visibility position-absolute">
						<i className="fa-solid fa-earth-americas"></i>
					</div>
				</Tooltip>
			</h1>
			<div className="pt-3">
				<ProfileProgress />
				<div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
					{userCv ? (
						<a
							href={
								"https://alumni-system-backend.azurewebsites.net/uploads/cvs/" +
								userCv
							}
							target="_blank"
							className="previewCV fw-bold py-2 px-3 btn"
							rel="noreferrer"
						>
							<span className="icon me-2">
								<i class="fa-solid fa-file me-2"></i>
							</span>
							Preview CV
						</a>
					) : (
						<CloudinaryUploadWidget
							cloudName="do6oz83pz"
							uploadPreset="ggdkuker"
							buttonClass="btn uploadCV fw-bold px-5"
							buttonText="Upload CV"
							onUploadSuccess={handleUploadSuccess}
							onUploadFailure={handleUploadFailure}
							options={cvUploaderOptions}
						/>
					)}
					<GenerateCV />
				</div>
			</div>
		</section>
	);
};

export default ProfileCV;
