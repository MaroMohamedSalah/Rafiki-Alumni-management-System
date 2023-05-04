import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileURLsSec = () => {
	const [isEmpty, setIsEmpty] = useState(true);

	const getURLs = () => {};

	const submitURLs = (requestData) => {
		// send POST request to the API to add URLs to the user's record
		const apiUrl =
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/set_integrations_urls.php";

		fetch(apiUrl, {
			method: "POST",
			body: JSON.stringify(requestData),
		})
			.then((response) => {
				if (response.ok) {
					// show a success message if the request was successful
					Swal.fire({
						icon: "success",
						title: "URLs added",
						text: "Your URLs have been added to your record.",
					});
					setIsEmpty(false);
				} else {
					// show an error message if the request failed
					throw new Error("Failed to add URLs. Please try again later.");
				}
			})
			.catch((error) => {
				// show an error message if the request failed due to a network error
				Swal.fire({
					icon: "error",
					title: "Request failed",
					text: error.message,
				});
			});
	};

	const addURLs = () => {
		Swal.fire({
			title: "Add Your Accounts URLs",
			html: `
      <form>
        <div class="form-group">
          <label for="linkedin">LinkedIn:</label>
          <input type="text" name="linkedin" id="linkedin">
        </div>
        <div class="form-group">
          <label for="github">GitHub:</label>
          <input type="text" name="github" id="github">
        </div>
        <div class="form-group">
          <label for="behance">Behance:</label>
          <input type="text" name="behance" id="behance">
        </div>
      </form>
    `,
			showCancelButton: true,
			confirmButtonText: "Save",
			cancelButtonText: "Cancel",
			focusConfirm: false,
			preConfirm: () => {
				const linkedinInput =
					Swal.getPopup().querySelector('[name="linkedin"]');
				const githubInput = Swal.getPopup().querySelector('[name="github"]');
				const behanceInput = Swal.getPopup().querySelector('[name="behance"]');
				const linkedinValue = linkedinInput.value.trim();
				const githubValue = githubInput.value.trim();
				const behanceValue = behanceInput.value.trim();

				// Regular expressions for validating URLs
				const urlRegex =
					/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
				const linkedinRegex =
					/^https:\/\/www\.linkedin\.com\/in\/[a-z0-9_-]+\/?$/i;
				const githubRegex = /^https:\/\/github\.com\/[a-z0-9_-]+\/?$/i;
				const behanceRegex = /^https:\/\/www\.behance\.net\/[a-z0-9_-]+\/?$/i;

				// Check if LinkedIn URL is valid
				if (linkedinValue && !linkedinRegex.test(linkedinValue)) {
					Swal.showValidationMessage("Invalid LinkedIn URL");
				}

				// Check if GitHub URL is valid
				if (githubValue && !githubRegex.test(githubValue)) {
					Swal.showValidationMessage("Invalid GitHub URL");
				}

				// Check if Behance URL is valid
				if (behanceValue && !behanceRegex.test(behanceValue)) {
					Swal.showValidationMessage("Invalid Behance URL");
				}

				// If all URLs are valid, return an object with the values
				if (linkedinValue || githubValue || behanceValue) {
					const requestData = {
						userID: localStorage.getItem("UserID"),
						linkedinURL: linkedinValue || "",
						githubURL: githubValue || "",
						behanceURL: behanceValue || "",
					};
					return requestData;
				}
			},
		}).then((result) => {
			// If the user clicked "Save" and all URLs are valid, submit the form
			if (result.isConfirmed && result.value) {
				submitURLs(result.value);
			}
		});
	};

	return (
		<section
			className={isEmpty === true ? "ProfileURLs sec empty" : "ProfileURLs sec"}
			onClick={isEmpty === true && addURLs}
		>
			<h1 className="sec-title">
				<span className="icon">
					<i className="fa-solid fa-link"></i>
				</span>{" "}
				Links & websites
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<div className="sec-placeholder">
						<span></span>
						<span></span>
					</div>
					<div className="sec-placeholder">
						<span></span>
						<span></span>
					</div>
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Add Your Accounts URLs</h1>
					</div>
				</div>
			) : null}
		</section>
	);
};

export default ProfileURLsSec;
