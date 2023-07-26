import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Keypad from "../imgs/Keypad.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const ProfileContactInfoSec = ({ phonePram, emailPram }) => {
	const profile = useSelector((state) => state.profile);
	const [email, setEmail] = useState(emailPram);
	const [phone, setPhone] = useState(phonePram);
	const sessionId = localStorage.getItem("sessionId");

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
				const phonePattern = /^[0-9]{10}$/;
				if (!phonePattern.test(num)) {
					Swal.showValidationMessage(
						"Please enter a valid 10-digit phone number"
					);
					return;
				}
				return num;
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});

		if (num) {
			const url =
				"https://alumni-system-backend.azurewebsites.net/api/users/update_phone";
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
					setPhone(num);
					Swal.fire({
						icon: "success",
						title: result.message,
					});
				} else {
					Swal.fire({
						icon: "error",
						title: result.message,
					});
				}
			} catch (error) {
				console.error(error);
				Swal.fire({
					title: "Error occurred",
					text: "Failed to add phone number",
					icon: "error",
				});
			}
		}
	};

	useEffect(() => {
		// if (phone !== null) {
		// 	console.log(completeProgress);
		// 	setCompleteProgress(completeProgress + 10);
		// }
	}, [phone]);

	return (
		<section className={"ProfileContactInfo sec"}>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i className="fa-solid fa-phone"></i>
				</span>{" "}
				Contact
				<OverlayTrigger
					overlay={
						<Tooltip id="my-tooltip" style={{ marginRight: "10px" }}>
							Visibility
						</Tooltip>
					}
					placement="left"
				>
					<div className="visibility position-absolute">
						<i className="fa-solid fa-user-tie"></i>
					</div>
				</OverlayTrigger>
			</h1>
			<div className="not-empty-sec row">
				<div className="col-12 col-md-6">
					<h1 className="phone-number" onClick={addPhoneNumber}>
						<span className="icon">
							<img src={Keypad} alt="" />
						</span>
						{phone === null ? (
							<span className="text-black-50 add-phone">
								Add Your Phone Number
							</span>
						) : (
							<>
								<span>{phone}</span>
								<span className="edit" onClick={addPhoneNumber}>
									<i className="fa-solid fa-pen-to-square"></i>
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
						{email === "" ? (
							<p class="placeholder-glow w-50 m-0 d-flex align-items-center">
								<span class="placeholder w-100"></span>
							</p>
						) : (
							<a className="email" href={`mailto:${email}`}>
								{email}
							</a>
						)}
					</h1>
				</div>
			</div>
		</section>
	);
};

export default ProfileContactInfoSec;
