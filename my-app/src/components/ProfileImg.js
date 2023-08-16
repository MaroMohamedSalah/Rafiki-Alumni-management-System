import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import Modal from "react-modal";
import ImgCropper from "./img-cropper/ImgCropper";
import { updateProfileImg } from "../redux/actions/profileActions";
import { useDispatch } from "react-redux";

const ProfileImg = ({ actor, profileData }) => {
	const sessionId = localStorage.getItem("sessionId");
	const [pic, setPic] = useState("");
	const [loadingPic, setLoadingPic] = useState(false);
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
	}, [profileData.Img]);

	const handleImageUpload = () => {
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
				const file = document.getElementById("file-input").files[0];
				try {
					const validatedFile = await validateFile(file);
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
				setLoadingPic(true);
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
						setLoadingPic(false);
						if (!response.ok) {
							throw new Error("Upload failed");
						}
						return response.json();
					})
					.then((data) => {
						if (data.success === true) {
							// setPic(
							// 	"https://alumni-system-backend.azurewebsites.net/uploads/pictures/" +
							// 		data.Img
							// );
							// console.log(data.Img);
							updateProfileImg(dispatch, data.Img);

							Swal.fire({
								title: "Success",
								text: data.message,
								icon: "success",
							});
						} else {
							Swal.fire({
								title: "Error",
								text: data.message,
								icon: "error",
							});
						}
					})
					.catch((error) => {
						setLoadingPic(false);
						Swal.fire({
							title: "Error",
							text: "Upload failed",
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

	return (
		<div
			className="ProfileImg img-fluid"
			id="profile-image"
			onClick={handleImageUpload}
		>
			<div className="userImg">
				<div className="position-relative">
					{loadingPic ? (
						<div className="overlay">
							<BeatLoader color="var(--Alumni-color)" />
						</div>
					) : croppedImg ? (
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
				<h1 className="position-absolute label">
					<span className="icon"></span> {actor}
				</h1>
			</div>
			<div className="addImg position-absolute">
				<i className="fa-solid fa-plus"></i>
			</div>

			{showCropper && (
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
			)}
		</div>
	);
};

export default ProfileImg;
