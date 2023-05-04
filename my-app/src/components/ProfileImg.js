import Profile from "../imgs/Alumni img.png";
import Swal from "sweetalert2";
const ProfileImg = ({ actor }) => {
	const addImg = () => {
		// Define file validation function
		const validateFile = (file) => {
			// Check if the file is an image
			if (!file.type.match("image.*")) {
				return Promise.reject("Please select an image file");
			}
			// Check if the file size is less than 5 MB
			if (file.size > 5 * 1024 * 1024) {
				return Promise.reject("File size must be less than 5 MB");
			}
			// If all checks pass, return the file data
			return Promise.resolve(file);
		};

		// Display SweetAlert2 pop-up
		Swal.fire({
			title: "Add/Edit Profile Picture",
			html: `
      <form action="path/to/upload-handler.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="profile-image" id="file-input">
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
				// You can do any additional processing of the file here
				// For example, display a preview of the image or update the profile picture in the UI
				// Then, submit the form to the server to handle the file upload
				Swal.showLoading();
				const form = document.querySelector("form");
				const formData = new FormData(form);
				// Use fetch or XMLHttpRequest to send the form data to the server
				fetch("path/to/upload-handler.php", {
					method: "POST",
					body: formData,
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error("Upload failed");
						}
						return response.json();
					})
					.then((data) => {
						// Handle the server response
						Swal.fire({
							title: "Success",
							text: "Profile picture updated",
							icon: "success",
						});
					})
					.catch((error) => {
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
		<div className="ProfileImg img-fluid" id="profile-image" onClick={addImg}>
			<div className="userImg">
				<i className="fa-regular fa-user"></i>
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
