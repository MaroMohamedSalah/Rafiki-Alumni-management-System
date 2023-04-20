import icon4 from "../imgs/sign up 4.svg";
const EmailInput = ({ emailError, setEmailError }) => {
	const emailChecker = (emailV) => {
		fetch(
			"https://alumnimanagmentsys12.000webhostapp.com/APIs/check_email.php",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					email: emailV,
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.error === true) {
					// yes -> Email is exist in our database
					console.log(data);
					setEmailError(data.message);
				} else {
					setEmailError("");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div className="email mb-3">
			<div className="input-group p-2">
				<span className="input-group-text" id="basic-addon1">
					<img src={icon4} alt="" />
				</span>
				<input
					name="email"
					id="email"
					type="email"
					className="form-control"
					placeholder="Email"
					aria-label="Email"
					aria-describedby="basic-addon1"
					onChange={(e) => {
						if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
							setEmailError("Invalid Email Address");
						} else {
							setEmailError("");
							emailChecker(e.target.value);
						}
					}}
				/>
			</div>
			<h5 className="error">{emailError}</h5>
		</div>
	);
};

export default EmailInput;
