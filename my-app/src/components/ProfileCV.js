import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ProfileProgress from "./ProfileProgress";
import Swal from "sweetalert2";

const ProfileCV = () => {
	const addCV = () => {
		// Define file validation function
		const validateFile = (file) => {
			// Check if the file is a PDF
			if (!file.type.match("application/pdf")) {
				return Promise.reject("Please select a PDF file");
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
			title: "Upload CV",
			html: `
      <form>
        <input type="file" name="cv" id="file-input">
      </form>
    `,
			showCancelButton: true,
			confirmButtonText: "Upload",
			showLoaderOnConfirm: true,
			preConfirm: () => {
				// Get the uploaded file
				const file = document.getElementById("file-input").files[0];
				// Validate the file and return a promise with the file data or an error message
				return validateFile(file);
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			// Check if the user clicked "Upload" and the file was successfully uploaded
			if (result.isConfirmed && result.value) {
				// Submit the form to the server to handle the file upload
				Swal.showLoading();
				const form = new FormData();
				const fileInput = document.getElementById("file-input");
				form.append("UserID", 1); // Set the UserID to 1 (or change this to a variable as needed)
				form.append("cv", fileInput.files[0]); // Add the selected file to the form data
				console.log(fileInput.files[0]);
				// Use fetch or XMLHttpRequest to send the form data to the server
				fetch(
					"https://alumnimanagmentsys12.000webhostapp.com/APIs/set_cv.php",
					{
						method: "POST",
						body: form,
					}
				)
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
							text: "CV uploaded",
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
		<section className={"ProfileCV sec"}>
			<h1 className="sec-title position-relative">
				Profile & CV
				<OverlayTrigger
					overlay={
						<Tooltip id="my-tooltip" style={{ marginRight: "10px" }}>
							Visibility
						</Tooltip>
					}
					placement="left"
				>
					<div className="visibility position-absolute">
						<i className="fa-solid fa-earth-americas"></i>
					</div>
				</OverlayTrigger>
			</h1>
			<div>
				<button className="btn uploadCV fw-bold" onClick={addCV}>
					<span className="icon me-2">
						<i className="fa-solid fa-arrow-up-from-bracket"></i>
					</span>{" "}
					Upload CV..
				</button>

				<ProfileProgress />
			</div>
		</section>
	);
};

export default ProfileCV;
