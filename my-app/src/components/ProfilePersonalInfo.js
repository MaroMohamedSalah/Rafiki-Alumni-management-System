import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";

const ProfilePersonalInfo = () => {
	const [birthDay, setBirthDay] = useState("");
	const [country, setCountry] = useState(null);

	const addCountry = async () => {
		// Fetch list of all countries
		const countriesResponse = await fetch("https://restcountries.com/v3.1/all");
		const countriesData = await countriesResponse.json();
		const countries = countriesData.map((country) => country.name.common);

		// Display select dialog for country
		const { value: selectedCountry } = await Swal.fire({
			title: "Please Select Your Country",
			input: "select",
			inputOptions: {
				...countries,
			},
			showCancelButton: true,
			confirmButtonText: "ADD",
			allowOutsideClick: () => !Swal.isLoading(),
		});

		if (selectedCountry) {
			// Send address to server
			const url =
				"https://alumnimanagmentsys12.000webhostapp.com/APIs/set_country.php";
			const options = {
				method: "POST",
				body: JSON.stringify({
					userID: parseInt(localStorage.getItem("UserID")),
					country: countries[selectedCountry],
				}),
			};

			try {
				const response = await fetch(url, options);
				const result = await response.json();
				Swal.fire({
					title: result.message,
				});
				setCountry(countries[selectedCountry]);
			} catch (error) {
				console.error(error);
				Swal.fire({
					title: "Error occurred",
					text: "Failed to add address",
					icon: "error",
				});
			}

			// Add event listener to close popup on back button press
			// const handlePopstate = () => {
			// 	console.log("close");
			// 	Swal.close();
			// 	window.removeEventListener("popstate", handlePopstate);
			// };
		}
	};

	useEffect(() => {
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/get_country.php",
			{
				method: "POST",
				body: JSON.stringify({
					userID: localStorage.getItem("UserID"),
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setCountry(data.country);
				console.log(data);
			})
			.catch((error) => console.log(error));
		console.log(window.location.href);
	}, []);
	return (
		<section className={"PersonalInformation sec"}>
			<h1 className="sec-title position-relative">
				<span className="icon">
					<i class="fa-solid fa-circle-info"></i>
				</span>{" "}
				Personal Information
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
			<div className="row not-empty-sec p-3">
				<div className="col-12 col-md-6">
					<h1 onClick={addCountry}>
						<span className="icon">
							<i className="fa-solid fa-location-dot"></i>
						</span>
						{country === null ? (
							<span className="text-black-50 add-address">
								Add Your Country
							</span>
						) : (
							<>
								<span>{country}</span>
								<span className="edit" onClick={addCountry}>
									<i className="fa-solid fa-pen-to-square"></i>
								</span>
							</>
						)}
					</h1>
				</div>
				<div className="col-12 col-md-6">
					<h1 className="d-flex align-items-center justify-content-start justify-content-md-end">
						<span className="icon">
							<i className="fa-solid fa-cake-candles"></i>
						</span>{" "}
						{birthDay === "" ? (
							<p class="placeholder-glow w-50 m-0 d-flex align-items-center">
								<span class="placeholder w-100"></span>
							</p>
						) : null}
					</h1>
				</div>
			</div>
		</section>
	);
};

export default ProfilePersonalInfo;
