import icon3 from "../imgs/sign up 3.svg";

const UsernameInput = ({
	setUsernameError,
	usernameError,
	isMain,
	setSubmitBtnContent,
}) => {
	// check if username is exist in database
	const usernameChecker = (username) => {
		const submitBtn = document.querySelector(".Auth form .submit button");
		isMain === true && submitBtn.setAttribute("disabled", true);
		fetch(
			"https://alumni-system-backend.azurewebsites.net/api/users/check_user_name",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					UserName: username,
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				isMain === true && submitBtn.removeAttribute("disabled");
				if (data.success === false) {
					setUsernameError(data.message);
					isMain === true && setSubmitBtnContent("Login");
				} else {
					setUsernameError("");
					isMain === true && setSubmitBtnContent("Confirm");
				}
			})
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div className="username mb-3">
			<div className="input-group p-2">
				<span className="input-group-text" id="basic-addon1">
					<img src={icon3} alt="" />
				</span>
				<input
					name="UserName"
					id="username"
					type="text"
					className="form-control"
					placeholder="Username"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onChange={(e) => {
						const regex = /^[a-zA-Z0-9_]{3,20}$/;
						if (!regex.test(e.target.value)) {
							setUsernameError(
								"Username must be 3-20 English characters long and can only contain letters, numbers, and underscores."
							);
						} else {
							usernameChecker(e.target.value);
							setUsernameError("");
						}
					}}
				/>
			</div>
			<h5 className="error">{usernameError}</h5>
		</div>
	);
};

export default UsernameInput;
