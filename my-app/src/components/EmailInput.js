import icon4 from "../imgs/sign up 4.svg";
const EmailInput = ({ emailError, setEmailError }) => {
	const emailChecker = (emailV) => {
		fetch("https://rafiki-backend.azurewebsites.net/api/users/check_email", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				Email: emailV,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success === false) {
					// yes -> Email is exist in our database
					console.log(data);
					setEmailError(data.message);
				} else {
					setEmailError("");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	const makeVibrate = () => {
		if ("vibrate" in navigator) {
			navigator.vibrate([50]);
		}
	};
	return (
		<div className="email mb-3">
			<div className="input-group p-2">
				<span className="input-group-text" id="basic-addon1">
					<img src={icon4} alt="" />
				</span>
				<input
					name="Email"
					id="email"
					type="email"
					className="form-control"
					placeholder="Email"
					aria-label="Email"
					aria-describedby="basic-addon1"
					onChange={(e) => {
						if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
							setEmailError("Invalid Email Address");
						} else {
							setEmailError("");
							emailChecker(e.target.value);
						}
					}}
					onClick={makeVibrate}
				/>
			</div>
			<h5 className="error">{emailError}</h5>
		</div>
	);
};

export default EmailInput;
