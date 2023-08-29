import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import Modal from "react-modal";
import ImgCropper from "./img-cropper/ImgCropper";
import {
	deleteUserImg,
	updateProfileImg,
} from "../redux/actions/profileActions";
import { useDispatch } from "react-redux";
import Toast from "./Toast";

const ProfileImg = ({ profileData }) => {
	const sessionId = localStorage.getItem("sessionId");
	const [pic, setPic] = useState("");
	const [croppedImg, setCroppedImg] = useState("");
	const [loadingCroppedImg, setLoadingCroppedImg] = useState(false);
	const [showCropper, setShowCropper] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		// Set the initial profile picture if available
		if (profileData.Img !== null) {
			setPic(
				"https://alumni-system-backend.azurewebsites.net/uploads/pictures/" +
					profileData.Img
			);
		}
	}, []);

	const handleImageUpload = () => {
		let selectedFile; // Declare the file variable in a higher scope
		const validateFile = (file) => {
			if (!file) {
				return Promise.reject("Please select an image file");
			}
			const allowedExtensions = ["jpg", "jpeg", "png"];
			const fileExtension = file.name.split(".").pop().toLowerCase();
			if (!allowedExtensions.includes(fileExtension)) {
				return Promise.reject(
					"Please select a valid image file (JPG, JPEG or PNG)"
				);
			}
			if (file.size > 8 * 1024 * 1024) {
				return Promise.reject("File size must be less than 8 MB");
			}
			return Promise.resolve(file);
		};

		Swal.fire({
			title: "Add/Edit Profile Picture",
			html: `
      <form method="POST" enctype="multipart/form-data">
	  <input type="file" name="picture" id="file-input">
      </form>
	  `,
			showCancelButton: true,
			confirmButtonText: "Next",
			showLoaderOnConfirm: true,
			preConfirm: async () => {
				selectedFile = document.getElementById("file-input").files[0];
				try {
					const validatedFile = await validateFile(selectedFile);
					// setShowCropper(true);
					// setIsModalOpen(true);
					return validatedFile;
				} catch (error) {
					Swal.showValidationMessage(error);
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.isConfirmed && result.value) {
				// Create a temporary URL for the uploaded image
				const uploadedImageURL = URL.createObjectURL(selectedFile);
				setPic(uploadedImageURL); // Update the state to display the image locally

				const form = document.querySelector("form");
				const formData = new FormData(form);
				fetch(
					"https://alumni-system-backend.azurewebsites.net/api/users/upload_picture",
					{
						method: "POST",
						body: formData,
						headers: {
							Authorization: `Bearer ${sessionId}`,
						},
					}
				)
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
			}
		});
	};

	const handleSaveCroppedImage = (croppedImage) => {
		setLoadingCroppedImg(true);
		// Perform any action needed with the cropped image data, e.g., upload it to the server.
		// In this example, we'll just update the state to show the cropped image on the profile picture.
		setCroppedImg(croppedImage);
		setLoadingCroppedImg(false);
		setIsModalOpen(false);
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
				fetch(
					`https://alumni-system-backend.azurewebsites.net/api/users/delete_profile_picture`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${sessionId}`,
						},
					}
				)
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
			onClick={pic ? handelImageDelete : handleImageUpload}
		>
			<div
				className="ProfileImg img-fluid"
				id="profile-image"
				onClick={handleImageUpload}
			>
				<div className="userImg">
					<div className="position-relative">
						{croppedImg ? (
							<img
								src={croppedImg}
								className="img-fluid w-100 h-100"
								alt="Profile Pic"
							/>
						) : pic ? (
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
				{/* {showCropper && (
					<Modal
						isOpen={isModalOpen}
						onRequestClose={() => setIsModalOpen(false)}
						contentLabel="Crop Image"
						ariaHideApp={false}
					>
						{loadingCroppedImg ? (
							<div>Loading...</div>
						) : (
							<ImgCropper
								onClose={() => setIsModalOpen(false)}
								imgSrc={pic}
								onSave={handleSaveCroppedImage}
							/>
						)}
					</Modal>
				)} */}
			</div>
			{pic ? (
				<div className="editImg delImg position-absolute">
					<i class="fa-regular fa-trash-can "></i>
				</div>
			) : (
				<div className="editImg addImg position-absolute">
					<i class="fa-solid fa-camera "></i>
				</div>
			)}
		</div>
	);
};

export default ProfileImg;
