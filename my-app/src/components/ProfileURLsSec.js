import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ProfileURLsSec = ({ setCompleteProgress, completeProgress }) => {
	const [isEmpty, setIsEmpty] = useState(true);
	// const [integrationsURLs, setIntegrationsURLs] = useState();
	const sessionId = localStorage.getItem("sessionId");
	const profile = useSelector((state) => state.profile);

	// const fetchURLsFromServer = () => {
	// 	fetch(
	// 		"https://alumnimanagmentsys12.000webhostapp.com/APIs/get_integrations_urls.php",
	// 		{
	// 			method: "POST",
	// 			body: new URLSearchParams({
	// 				user_id: localStorage.getItem("UserID"),
	// 			}),
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setIntegrationsURLs(data);
	// 			setIsEmpty(false);
	// 			// setCompleteProgress(completeProgress + 10);
	// 		})
	// 		.catch((error) => console.error(error));
	// };

	const saveURLsToServer = (requestData) => {
		// send POST request to the API to add URLs to the user's record
		const apiUrl =
			"https://alumni-system-backend.azurewebsites.net/api/users/update_social_urls";

		fetch(apiUrl, {
			method: "PUT",
			body: JSON.stringify(requestData),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
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
					// fetchURLsFromServer();
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

	const showURLsFormPopup = () => {
		Swal.fire({
			title: "Add Your Accounts URLs",
			html: `<form id="urlsForm">
			<div class="form-group my-3">
				<label class="mb-2 text-start w-100" for="linkedin">
					LinkedIn
				</label>
				<input
					type="url"
					class="form-control"
					name="linkedin"
					id="linkedin"
					placeholder="https://www.linkedin.com/in/username"
					required
				/>
			</div>
			<div class="form-group my-3">
				<label class="mb-2 text-start w-100" for="github">
					GitHub
				</label>
				<input
					type="url"
					class="form-control"
					name="github"
					id="github"
					placeholder="https://github.com/username"
					required
				/>
			</div>
			<div class="form-group my-3">
				<label class="mb-2 text-start w-100" for="behance">
					Behance
				</label>
				<input
					type="url"
					class="form-control"
					name="behance"
					id="behance"
					placeholder="https://www.behance.net/username"
					required
				/>
			</div>
		</form>`, // HTML code for the form directly here
			showCancelButton: true,
			showConfirmButton: true, // Disable the default "Save" button
			cancelButtonText: "Cancel",
			focusConfirm: false,
			preConfirm: () => {
				const form = document.getElementById("urlsForm");
				const linkedinValue = form.linkedin.value.trim();
				const githubValue = form.github.value.trim();
				const behanceValue = form.behance.value.trim();

				// Regular expressions for validating URLs
				const linkedinRegex =
					/^https:\/\/www\.linkedin\.com\/in\/[a-z0-9_-]+\/?$/i;
				const githubRegex = /^https:\/\/github\.com\/[a-z0-9_-]+\/?$/i;
				const behanceRegex = /^https:\/\/www\.behance\.net\/[a-z0-9_-]+\/?$/i;

				// Check if at least one URL is provided
				if (!linkedinValue && !githubValue && !behanceValue) {
					Swal.showValidationMessage("Please provide at least one URL");
				} else {
					// Check if URLs are valid
					const validationErrors = [];
					if (linkedinValue && !linkedinRegex.test(linkedinValue)) {
						validationErrors.push("Invalid LinkedIn URL");
					}
					if (githubValue && !githubRegex.test(githubValue)) {
						validationErrors.push("Invalid GitHub URL");
					}
					if (behanceValue && !behanceRegex.test(behanceValue)) {
						validationErrors.push("Invalid Behance URL");
					}

					if (validationErrors.length > 0) {
						// Display error messages
						const errorMessages = validationErrors.join("<br>");
						Swal.showValidationMessage(errorMessages);
					} else {
						// If at least one URL is valid, return an object with the values
						const requestData = {
							LinkedIn_URL: linkedinValue || "",
							GitHub_URL: githubValue || "",
							Behance_URL: behanceValue || "",
						};
						return requestData;
					}
				}
			},
		}).then((result) => {
			// If the user clicked "Save" and all URLs are valid, submit the form
			if (result.isConfirmed && result.value) {
				saveURLsToServer(result.value);
			}
		});
	};

	const displayURLsList = () => {
		if (profile && profile.alumni) {
			return Object.entries(profile.alumni).map(([key, value]) => {
				if (key.endsWith("_URL") && value) {
					const urlType = key.replace("_URL", "").toLowerCase();
					return (
						<li key={urlType}>
							<span className={`icon ${urlType}`}>
								<i className={`fa-brands fa-${urlType}`}></i>
							</span>{" "}
							<a href={value} target="_blank" rel="noreferrer">
								{urlType.charAt(0).toUpperCase() + urlType.slice(1)}
							</a>
						</li>
					);
				}
				return null;
			});
		}
		return null;
	};

	useEffect(() => {
		// Check if any of the URLs in profile.alumni is not null
		if (profile && profile.alumni) {
			for (const key in profile.alumni) {
				if (key.endsWith("_URL") && profile.alumni[key] !== null) {
					setIsEmpty(false);
					break;
				}
			}
		}
	}, [profile]);

	return (
		<section
			className={isEmpty === true ? "ProfileURLs sec empty" : "ProfileURLs sec"}
			onClick={() => {
				if (isEmpty) showURLsFormPopup();
			}}
		>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-link"></i>
				</span>{" "}
				Links & websites
				{isEmpty === false && (
					<>
						<OverlayTrigger
							overlay={<Tooltip id="my-tooltip">Visibility</Tooltip>}
							placement="bottom"
						>
							<div className="visibility position-absolute">
								<i className="fa-solid fa-user-tie"></i>
							</div>
						</OverlayTrigger>
						<OverlayTrigger
							overlay={<Tooltip id="my-tooltip">Edit URLs</Tooltip>}
							placement="bottom"
						>
							<div
								className="add position-absolute"
								onClick={showURLsFormPopup}
							>
								<i className="fa-solid fa-plus"></i>
							</div>
						</OverlayTrigger>
					</>
				)}
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
			) : (
				<ul className="url-list">{displayURLsList()}</ul>
			)}
		</section>
	);
};

export default ProfileURLsSec;
