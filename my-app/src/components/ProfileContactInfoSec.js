import { useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import Keypad from "../imgs/Keypad.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import {
	deletePhone,
	updateProfilePhone,
} from "../redux/actions/profileActions";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ProfileContactInfoSec = () => {
	const userInfo = useSelector((state) => state.profile.userInfo);
	const sessionId = localStorage.getItem("sessionId");
	const dispatch = useDispatch();

	const addPhoneNumber = async () => {
		const { value: num } = await Swal.fire({
			title: "Please Enter Your Phone Number",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "ADD",
			showLoaderOnConfirm: true,
			preConfirm: (num) => {
				// validate the phone number using a regular expression
				const phonePattern = /^[0-9]{11}$/;
				if (!phonePattern.test(num)) {
					Swal.showValidationMessage(
						"Please enter a valid 11-digit phone number"
					);
					return;
				}
				return num;
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});

		if (num) {
			const url = `${baseBackendUrl}/users/update_phone`;
			const options = {
				method: "PUT",
				body: JSON.stringify({
					Phone: num,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			};

			try {
				const response = await fetch(url, options);
				const result = await response.json();
				if (result.success === true) {
					Toast({ title: result.message, icon: "success" });
					updateProfilePhone(dispatch, num);
				} else {
					Toast({ title: result.message, icon: "error" });
				}
			} catch (error) {
				console.error(error);
				Toast({ title: "Failed to add phone number", icon: "error" });
			}
		}
	};

	const handelDelete = async () => {
		Swal.fire({
			title: `Do you want to delete your phone number?`,
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: "Yes",
			denyButtonText: `Cancel`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(`${baseBackendUrl}/users/delete_phone`, {
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
								title: `Your phone deleted`,
								text: "Your phone have been deleted from your profile.",
							});
							deletePhone(dispatch);
						} else {
							// show an error message if the request failed
							throw new Error(
								"Failed to delete Phone. Please try again later."
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
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	return (
		<section className={"ProfileContactInfo sec"}>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-phone"></i>
				</span>{" "}
				Contact
				<Tooltip title="Visibility">
					<div className="visibility position-absolute">
						<i className="fa-solid fa-user-tie"></i>
					</div>
				</Tooltip>
			</h1>
			<div className="not-empty-sec row">
				<div className="col-12 col-md-6">
					<h1 className="phone-number">
						<span className="icon">
							<img src={Keypad} alt="" />
						</span>
						{userInfo.user.Phone === null ? (
							<span
								className="text-black-50 add-phone"
								onClick={addPhoneNumber}
							>
								Add Your Phone Number
							</span>
						) : (
							<>
								<span>{userInfo.user.Phone}</span>
								<Tooltip title="Edit">
									<IconButton
										onClick={addPhoneNumber}
										aria-label="delete"
										className="edit"
									>
										<AppRegistrationIcon fontSize="medium" />
									</IconButton>
								</Tooltip>

								<span>
									<Tooltip title="Delete">
										<IconButton
											onClick={handelDelete}
											aria-label="delete"
											className="delete edit ps-2"
										>
											<DeleteIcon fontSize="medium" />
										</IconButton>
									</Tooltip>
								</span>
							</>
						)}
					</h1>
				</div>
				<div className="col-12 col-md-6">
					<h1 className="d-flex align-items-center justify-content-start justify-content-md-end">
						<span className="icon">
							<i className="fa-regular fa-envelope"></i>
						</span>{" "}
						{userInfo.user.Email && (
							<a className="email" href={`mailto:${userInfo.user.Email}`}>
								{userInfo.user.Email}
							</a>
						)}
					</h1>
				</div>
			</div>
		</section>
	);
};

export default ProfileContactInfoSec;
