import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import {
	deleteUserImg,
	updateProfileImg,
} from "../redux/actions/profileActions";
import { useDispatch } from "react-redux";
import Toast from "./Toast";
import { CloudinaryUploadWidget } from "react-cloudinary-uploader";
import { Tooltip } from "@mui/material";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ProfileImg = ({ profileData }) => {
	const sessionId = localStorage.getItem("sessionId");
	const [pic, setPic] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		// Set the initial profile picture if available
		if (profileData.Img !== null) {
			setPic(profileData.Img);
		}
	}, []);

	const handleImgUploadSuccess = (info) => {
		setPic(info.secure_url); // Update the state to display the image locally
		console.log("Upload success:", info);

		fetch(`${baseBackendUrl}/users/upload_picture`, {
			method: "POST",
			body: JSON.stringify({
				pictureUrl: info.secure_url,
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
					updateProfileImg(dispatch, data.Img);
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

	const handleImgUploadFailure = (error) => {
		console.error("Upload error:", error);
		Toast({ title: "Upload Error", icon: "error" });
	};

	const pictureUploaderOptions = {
		clientAllowedFormats: ["jpg", "jpeg", "png", "gif"], // allowed file formats
		resourceType: "image", // resource type, either 'image' or 'video'
		cropping: true, // cropping is enabled
		croppingAspectRatio: 1, // square aspect ratio
		croppingShowDimensions: true, // show cropping dimensions
		croppingValidateDimensions: true, // validate image dimensions after cropping
		maxFileSize: 10000000, // max file size in bytes (10 MB)
		folder: "images", // Cloudinary folder to upload to
		sources: ["local", "url", "camera", "google_drive"], // upload sources, either 'local', 'url', 'camera' or 'google_drive'
	};

	const handelImageDelete = () => {
		Swal.fire({
			title: `Do you want to delete your profile Image?`,
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: "Yes",
			denyButtonText: `Cancel`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(`${baseBackendUrl}/users/delete_profile_picture`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${sessionId}`,
					},
				})
					.then((response) => {
						if (response.ok) {
							// show a success message if the request was successful
							// Swal.fire({
							// 	icon: "success",
							// 	title: `Image Deleted`,
							// 	text: "Your image have been deleted from your profile.",
							// });
							Toast({ title: "Image Deleted", icon: "success" });
							setPic(null);
							deleteUserImg(dispatch);
						} else {
							// show an error message if the request failed
							Toast({
								title: "Failed to delete img. Please try again later.",
								icon: "error",
							});
							throw new Error("Failed to delete img. Please try again later.");
						}
					})
					.catch((error) => {
						// show an error message if the request failed due to a network error
						Toast({
							title: "Request failed",
							icon: "error",
						});
					});
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	return (
		<div
			className="imgContainer position-relative"
			// onClick={pic ? handelImageDelete() : null}
		>
			<div className="ProfileImg img-fluid" id="profile-image">
				<div className="userImg">
					<div className="position-relative">
						{pic ? (
							<img
								src={pic}
								className="img-fluid w-100 h-100"
								alt="Profile Pic"
							/>
						) : (
							<div className="default-placeholder">
								<i className="fa-regular fa-user"></i>
							</div>
						)}
					</div>
				</div>
			</div>
			{pic ? (
				// Render delete icon
				<Tooltip title="Delete">
					<div
						className="editImg delImg position-absolute"
						onClick={handelImageDelete}
					>
						<i className="fa-regular fa-trash-can "></i>
					</div>
				</Tooltip>
			) : (
				// Render upload widget and add icon
				<div className="editImg addImg position-absolute">
					<i className="fa-solid fa-camera "></i>
					<CloudinaryUploadWidget
						cloudName="do6oz83pz"
						uploadPreset="ggdkuker"
						buttonStyle={{
							position: "absolute",
							height: "130px",
							top: "-103px",
							left: "-96px",
							width: "130px",
							opacity: "0",
						}}
						buttonClass="add"
						buttonText="Choose Image"
						onUploadSuccess={handleImgUploadSuccess}
						onUploadFailure={handleImgUploadFailure}
						options={pictureUploaderOptions}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileImg;
