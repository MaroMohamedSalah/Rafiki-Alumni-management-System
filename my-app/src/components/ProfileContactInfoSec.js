import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Keypad from "../imgs/Keypad.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { updateProfilePhone } from "../redux/actions/profileActions";

const ProfileContactInfoSec = ({ phonePram, emailPram }) => {
	const profile = useSelector((state) => state.profile);
	const [email, setEmail] = useState(emailPram);
	const [phone, setPhone] = useState(phonePram);
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
