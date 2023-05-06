import axios from "axios";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";

const ProfileAboutSec = () => {
	const [isEmpty, setIsEmpty] = useState(true);
	const [about, setAbout] = useState(null);
	const [charCount, setCharCount] = useState(0);

	const getAbout = () => {
		fetch(
			`https://alumnimanagmentsys12.000webhostapp.com/APIs/get_about_section.php?UserID=${localStorage.getItem(
				"UserID"
			)}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.error === false) {
					setAbout(data.message);
					setIsEmpty(false);
				}
			})
			.catch((error) => console.error(error));
	};

	const submitAboutSection = async () => {
		const { value: about } = await Swal.fire({
			title: "Inform Yourself",
			input: "textarea",
			inputAttributes: {
				autocapitalize: "off",
				minlength: 50, // set minimum length requirement
				id: "about-textarea",
			},
			inputValidator: (value) => {
				if (!value || value.length < 50) {
					return "Please enter at least 50 characters";
				}
			},
			showCancelButton: true,
			confirmButtonText: "ADD",
			showLoaderOnConfirm: true,
			footer: `<span id="char-count">${charCount}/500</span>`,
		});

		if (about) {
			// send POST request to the API to add URLs to the user's record
			const apiUrl =
				"https://alumnimanagmentsys12.000webhostapp.com/APIs/set_about_section.php";

			fetch(apiUrl, {
				method: "POST",
				body: JSON.stringify({
					userID: localStorage.getItem("UserID"),
					About: about,
				}),
			})
				.then((response) => {
					console.log(response);
					if (response.ok) {
						// show a success message if the request was successful
						Swal.fire({
							icon: "success",
							title: "About Section Added",
							text: response.message,
						});
						setIsEmpty(false);
						setAbout(about);
					} else {
						// show an error message if the request failed
						throw new Error(
							"Failed to add About Section. Please try again later."
						);
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
		}
	};

	useEffect(() => {
		getAbout();
	}, []);

	return (
		<section
			className={
				isEmpty === true ? "ProfileAbout sec empty" : "ProfileAbout sec"
			}
			onClick={() => {
				if (isEmpty) submitAboutSection();
			}}
		>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-address-card"></i>
				</span>{" "}
				About
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
							overlay={<Tooltip id="my-tooltip">Edit Bio</Tooltip>}
							placement="bottom"
						>
							<div
								className="add position-absolute"
								onClick={submitAboutSection}
							>
								<i className="fa-solid fa-pen-to-square"></i>
							</div>
						</OverlayTrigger>
					</>
				)}
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<div className="sec-placeholder-2">
						<span></span>
						<span></span>
						<span className="half"></span>
					</div>
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Inform yourself in About Section</h1>
					</div>
				</div>
			) : (
				<p>{about}</p>
			)}
		</section>
	);
};

export default ProfileAboutSec;
