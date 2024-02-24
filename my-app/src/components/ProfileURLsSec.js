import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
	deleteSocialURL,
	updateSocialURLs,
} from "../redux/actions/profileActions";
import Toast from "./Toast";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Skeleton, Tooltip } from "@mui/material";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ProfileURLsSec = ({ profileData }) => {
	const [isEmpty, setIsEmpty] = useState(true);
	const sessionId = localStorage.getItem("sessionId");
	const dispatch = useDispatch();
	function capitalizeFirstLetter(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	const saveURLsToServer = (requestData) => {
		// send POST request to the API to add URLs to the user's record
		const apiUrl = `${baseBackendUrl}/users/update_social_urls`;

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
					Toast({
						title: "Your URLs have been added to your record.",
						icon: "success",
					});
					setIsEmpty(false);
					updateSocialURLs(dispatch, requestData);
					// fetchURLsFromServer();
				} else {
					// show an error message if the request failed
					Toast({
						title: "Failed to add URLs. Please try again later.",
						icon: "error",
					});
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
		const linkedinValue = profileData.LinkedIn_URL || "";
		const githubValue = profileData.GitHub_URL || "";
		const behanceValue = profileData.Behance_URL || "";

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
          value="${linkedinValue}"
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
          value="${githubValue}"
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
          value="${behanceValue}"
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

				// Set empty values to null
				const cleanedLinkedinValue =
					linkedinValue === "" ? null : linkedinValue;
				const cleanedGithubValue = githubValue === "" ? null : githubValue;
				const cleanedBehanceValue = behanceValue === "" ? null : behanceValue;

				// Regular expressions for validating URLs
				const linkedinRegex =
					/^https:\/\/www\.linkedin\.com\/in\/[a-z0-9_-]+\/?$/i;
				const githubRegex = /^https:\/\/github\.com\/[a-z0-9_-]+\/?$/i;
				const behanceRegex = /^https:\/\/www\.behance\.net\/[a-z0-9_-]+\/?$/i;

				// Check if at least one URL is provided
				if (
					!cleanedLinkedinValue &&
					!cleanedGithubValue &&
					!cleanedBehanceValue
				) {
					Swal.showValidationMessage("Please provide at least one URL");
				} else {
					// Check if URLs are valid
					const validationErrors = [];
					if (
						cleanedLinkedinValue &&
						!linkedinRegex.test(cleanedLinkedinValue)
					) {
						validationErrors.push("Invalid LinkedIn URL");
					}
					if (cleanedGithubValue && !githubRegex.test(cleanedGithubValue)) {
						validationErrors.push("Invalid GitHub URL");
					}
					if (cleanedBehanceValue && !behanceRegex.test(cleanedBehanceValue)) {
						validationErrors.push("Invalid Behance URL");
					}

					if (validationErrors.length > 0) {
						// Display error messages
						const errorMessages = validationErrors.join("<br>");
						Swal.showValidationMessage(errorMessages);
					} else {
						// If at least one URL is valid, return an object with the values
						const requestData = {
							LinkedIn_URL: cleanedLinkedinValue || null,
							GitHub_URL: cleanedGithubValue || null,
							Behance_URL: cleanedBehanceValue || null,
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
	const handelDeleteUrl = (urlType, serverKey) => {
		Swal.fire({
			title: `Do you want to delete the ${capitalizeFirstLetter(urlType)} URL?`,
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: "Yes",
			denyButtonText: `Cancel`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(`${baseBackendUrl}/users/delete_${urlType}_url`, {
					method: "DELETE",
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
								title: `${capitalizeFirstLetter(urlType)} URL Deleted`,
								text: "Your URL have been deleted from your profile.",
							});
							deleteSocialURL(dispatch, serverKey);
							setIsEmpty(false);
						} else {
							// show an error message if the request failed
							throw new Error("Failed to delete URL. Please try again later.");
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
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	const displayURLsList = () => {
		if (profileData) {
			return Object.entries(profileData).map(([key, value]) => {
				if (key.endsWith("_URL") && value) {
					const urlType = key.replace("_URL", "").toLowerCase();
					return (
						<li
							key={urlType}
							className="d-flex justify-content-between align-items-center py-2 border-bottom"
						>
							<div>
								<span className={`icon ${urlType}`}>
									<i className={`fa-brands fa-${urlType}`}></i>
								</span>{" "}
								<a href={value} target="_blank" rel="noreferrer">
									{urlType.charAt(0).toUpperCase() + urlType.slice(1)}
								</a>
							</div>
							<div
								className="deleteUrl"
								onClick={() => handelDeleteUrl(urlType, key)}
							>
								<IconButton aria-label="delete" size="small">
									<ClearIcon fontSize="inherit" />
								</IconButton>
							</div>
						</li>
					);
				}
				return null;
			});
		}
		return null;
	};

	useEffect(() => {
		if (profileData) {
			let countOfEmpty = 0;

			for (const key in profileData) {
				if (key.endsWith("_URL") && profileData[key] !== null) {
					setIsEmpty(false);
					break;
				} else if (key.endsWith("_URL") && profileData[key] === null) {
					countOfEmpty++;
				}
			}

			if (countOfEmpty === 3) {
				setIsEmpty(true);
			}
		}
	}, [profileData]);

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
						<Tooltip title="Visibility">
							<div className="visibility position-absolute">
								<i className="fa-solid fa-user-tie"></i>
							</div>
						</Tooltip>

						<Tooltip title="Edit URLs">
							<div
								className="add position-absolute"
								onClick={showURLsFormPopup}
							>
								<i className="fa-solid fa-plus"></i>
							</div>
						</Tooltip>
					</>
				)}
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Add Your Accounts URLs</h1>
					</div>
				</div>
			) : (
				<ul className="url-list ps-0">{displayURLsList()}</ul>
			)}
		</section>
	);
};

export default ProfileURLsSec;
