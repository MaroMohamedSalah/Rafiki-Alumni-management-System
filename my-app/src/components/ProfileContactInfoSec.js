import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Keypad from "../imgs/Keypad.svg";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileContactInfoSec = ({ setCompleteProgress, completeProgress }) => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState(null);
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
				"https://alumnimanagmentsys12.000webhostapp.com/APIs/set_phone.php";
			const options = {
				method: "POST",
				body: JSON.stringify({
					userID: localStorage.getItem("UserID"),
					phone: num,
				}),
			};

			try {
				const response = await fetch(url, options);
				const result = await response.json();
				Swal.fire({
					title: result.message,
				});
				setPhone(num);
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
		axios
			.get(
				`https://alumnimanagmentsys12.000webhostapp.com/APIs/get_email.php?user_id=${localStorage.getItem(
					"UserID"
				)}`
			)
			.then((response) => {
				setEmail(response.data.email);
			})
			.catch((error) => {
				console.log(error);
			});

		fetch("https://alumnimanagmentsys12.000webhostapp.com/APIs/get_phone.php", {
			method: "POST",
			body: JSON.stringify({
				userID: localStorage.getItem("UserID"),
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setPhone(data.phone);
				console.log(data.phone);
			})
			.catch((error) => console.log(error));

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
