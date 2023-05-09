import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";

const ProfileURLsSec = ({ setCompleteProgress, completeProgress }) => {
	const [isEmpty, setIsEmpty] = useState(true);
	const [integrationsURLs, setIntegrationsURLs] = useState();

	const getURLs = () => {
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/get_integrations_urls.php",
			{
				method: "POST",
				body: new URLSearchParams({
					user_id: localStorage.getItem("UserID"),
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setIntegrationsURLs(data);
				setIsEmpty(false);
				// setCompleteProgress(completeProgress + 10);
			})
			.catch((error) => console.error(error));
	};

	const storeURLs = (requestData) => {
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
					getURLs();
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
		<div class="input-box">
			<input type="text" name="linkedin" id="linkedin">
            <span>Linkedin</span>
            <i></i>
        </div>
		
		<div class="input-box">
			<input type="text" name="github" id="github">
            <span>Github</span>
            <i></i>
        </div>

		<div class="input-box">
			<input type="text" name="behance" id="behance">
            <span>Behance</span>
            <i></i>
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

				// If at least one URL is valid, return an object with the values
				if (linkedinValue || githubValue || behanceValue) {
					const requestData = {
						userID: localStorage.getItem("UserID"),
						linkedinURL: linkedinValue || "",
						githubURL: githubValue || "",
						behanceURL: behanceValue || "",
					};
					return requestData;
				} else {
					Swal.showValidationMessage("Please enter at least one URL");
				}
			},
		}).then((result) => {
			// If the user clicked "Save" and all URLs are valid, submit the form
			if (result.isConfirmed && result.value) {
				storeURLs(result.value);
			}
		});
	};

	const displayURLs = () => {
		if (integrationsURLs) {
			return integrationsURLs.map((u) => {
				switch (u.url_type) {
					case "linkedin":
						return (
							<li>
								<span className="icon linkedin">
									<i className="fa-brands fa-linkedin"></i>
								</span>{" "}
								<a href={u.url_value} target="_blank" rel="noreferrer">
									Linkedin
								</a>
							</li>
						);
					case "github":
						return (
							<li>
								<span className="icon github">
									<i className="fa-brands fa-github"></i>
								</span>{" "}
								<a href={u.url_value} target="_blank" rel="noreferrer">
									Github
								</a>
							</li>
						);
					case "behance":
						return (
							<li>
								<span className="icon behance">
									<i className="fa-brands fa-square-behance"></i>
								</span>{" "}
								<a href={u.url_value} target="_blank" rel="noreferrer">
									Behance
								</a>
							</li>
						);
					default:
						return null;
				}
			});
		}
		return null;
	};

	useEffect(() => {
		getURLs();
	}, []);
	return (
		<section
			className={isEmpty === true ? "ProfileURLs sec empty" : "ProfileURLs sec"}
			onClick={() => {
				if (isEmpty) addURLs();
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
							<div className="add position-absolute" onClick={addURLs}>
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
				<ul className="url-list">{displayURLs()}</ul>
			)}
		</section>
	);
};

export default ProfileURLsSec;
