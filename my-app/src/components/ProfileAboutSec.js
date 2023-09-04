import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Toast from "./Toast";
import { updateProfileAbout } from "../redux/actions/profileActions";
import { Skeleton, Tooltip } from "@mui/material";

const ProfileAboutSec = ({ aboutContent }) => {
	const [isEmpty, setIsEmpty] = useState(true);
	const [about, setAbout] = useState(aboutContent);

	const sessionId = localStorage.getItem("sessionId");
	const dispatch = useDispatch();

	const submitAboutSection = async () => {
		const { value: updatedAbout } = await Swal.fire({
			title: "Inform Yourself",
			input: "textarea",
			inputValue: about !== null ? about : "",
			inputAttributes: {
				autocapitalize: "off",
				minlength: 50,
				id: "about-textarea",
			},
			inputValidator: (value) => {
				const regex = /[a-zA-Z0-9\s.,]/;
				if (!regex.test(value) || value.length < 50) {
					return "Please enter at least 50 English characters";
				}
			},
			showCancelButton: true,
			confirmButtonText: "ADD",
			showLoaderOnConfirm: true,
		});

		if (updatedAbout) {
			// send PUT request to update About Section
			const apiUrl =
				"https://alumni-system-backend.azurewebsites.net/api/users/update_about";

			fetch(apiUrl, {
				method: "PUT",
				body: JSON.stringify({
					About: updatedAbout,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			})
				.then((response) => {
					if (response.ok) {
						// show a success message if the request was successful

						Toast({ title: "About updated", icon: "success" });
						setIsEmpty(false);
						setAbout(updatedAbout);
						updateProfileAbout(dispatch, updatedAbout);
					} else {
						// show an error message if the request failed
						Toast({
							title: "Failed to update About Section. Please try again later.",
							icon: "error",
						});
						throw new Error(
							"Failed to update About Section. Please try again later."
						);
					}
				})
				.catch((error) => {
					// show an error message if the request failed due to a network error
					Toast({
						title: "Technical Error",
						icon: "error",
					});
				});
		}
	};

	useEffect(() => {
		if (about) {
			setIsEmpty(false);
		}
	}, [about]);

	return (
		<section
			className={isEmpty ? "ProfileAbout sec empty" : "ProfileAbout sec"}
			onClick={() => {
				if (isEmpty) submitAboutSection();
			}}
		>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-address-card"></i>
				</span>{" "}
				About
				{!isEmpty && (
					<>
						<Tooltip title="Visibility">
							<div className="visibility position-absolute">
								<i className="fa-solid fa-user-tie"></i>
							</div>
						</Tooltip>

						<Tooltip title="Edit Bio">
							<div
								className="add position-absolute"
								onClick={submitAboutSection}
							>
								<i className="fa-solid fa-pen-to-square"></i>
							</div>
						</Tooltip>
					</>
				)}
			</h1>
			{isEmpty ? (
				<div className="empty-sec position-relative">
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
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
