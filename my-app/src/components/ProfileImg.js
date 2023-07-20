import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";

const ProfileImg = ({ actor, profileData }) => {
	const sessionId = localStorage.getItem("sessionId");
	const [pic, setPic] = useState("");
	const [loadingPic, setLoadingPic] = useState(false); // Set the initial loading state to false
	const [uploadEndpoint, setUploadEndpoint] = useState("");

	useEffect(() => {
		// Set the initial profile picture if available
		if (profileData.Img !== null) {
			setPic(
				"https://alumni-system-backend.azurewebsites.net/uploads/pictures/" +
					profileData.Img
			);
		}

		// Set the appropriate upload endpoint based on the actor type
		switch (actor) {
			case "Alumni":
				setUploadEndpoint(
					"https://alumni-system-backend.azurewebsites.net/api/users/upload_alumni_picture"
				);
				break;
			// Add cases for other actors if needed
			default:
				break;
		}
	}, [actor, profileData.Img]);

	const handleImageUpload = () => {
		const validateFile = (file) => {
			// Check if the file is an image
			if (!file.type.match("image.*")) {
				return Promise.reject("Please select an image file");
			}
			// Check if the file size is less than 8 MB
			if (file.size > 8 * 1024 * 1024) {
				return Promise.reject("File size must be less than 8 MB");
			}
			// If all checks pass, return the file data
			return Promise.resolve(file);
		};

		// Display SweetAlert2 pop-up
		Swal.fire({
			title: "Add/Edit Profile Picture",
			html: `
      <form method="POST" enctype="multipart/form-data">
        <input type="file" name="picture" id="file-input">
      </form>
    `,
			showCancelButton: true,
			confirmButtonText: "Save",
			showLoaderOnConfirm: true,
			preConfirm: () => {
				// Get the uploaded file
				const file = document.getElementById("file-input").files[0];
				// Validate the file and return a promise with the file data or an error message
				return validateFile(file);
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			// Check if the user clicked "Save" and the file was successfully uploaded
			if (result.isConfirmed && result.value) {
				setLoadingPic(true); // Set loading to true when the request starts
				Swal.showLoading();
				const form = document.querySelector("form");
				const formData = new FormData(form);
				// Use fetch or XMLHttpRequest to send the form data to the server
				fetch(uploadEndpoint, {
					method: "POST",
					body: formData,
					headers: {
						Authorization: `Bearer ${sessionId}`,
					},
				})
					.then((response) => {
						setLoadingPic(false); // Set loading to false when the request completes
						if (!response.ok) {
							throw new Error("Upload failed");
						}
						return response.json();
					})
					.then((data) => {
						// Handle the server response
						if (data.success === true) {
							Swal.fire({
								title: "Success",
								text: data.message,
								icon: "success",
							});
							setPic(
								"https://alumni-system-backend.azurewebsites.net/uploads/pictures/" +
									profileData.Img
							);
						} else {
							// Handle the case when the server returns an unsuccessful response
							Swal.fire({
								title: "Error",
								text: data.message,
								icon: "error",
							});
						}
					})
					.catch((error) => {
						setLoadingPic(false); // Set loading to false when the request completes with an error
						// Handle errors
						Swal.fire({
							title: "Error",
							text: "Upload failed",
							icon: "error",
						});
					});
			}
		});
	};

	return (
		<div
			className="ProfileImg img-fluid"
			id="profile-image"
			onClick={handleImageUpload}
		>
			<div className="userImg">
				<div className="position-relative">
					{loadingPic ? ( // Show a loading indicator while the image is being uploaded
						<div className="overlay">
							<BeatLoader color="var(--Alumni-color)" />
						</div>
					) : pic !== "" ? (
						<img
							src={pic}
							className="img-fluid w-100 h-100"
							alt="Profile Pic"
							loading="lazy"
						/>
					) : (
						<i className="fa-regular fa-user"></i>
					)}
				</div>
				<h1 className="position-absolute label">
					<span className="icon"></span> {actor}
				</h1>
			</div>
			<div className="addImg position-absolute">
				<i className="fa-solid fa-plus"></i>
			</div>
		</div>
	);
};

export default ProfileImg;
