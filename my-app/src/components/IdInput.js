import { json } from "react-router";
import icon2 from "../imgs/sign up  2.svg";
const IdInput = ({
	setCollageIDError,
	collageIDError,
	setSubmitBtnContent,
}) => {
	const collageIDChecker = (ID) => {
		const submitBtn = document.querySelector(".Auth form .submit button");
		submitBtn.setAttribute("disabled", true);
		fetch("/users/check_academic_id", {
			method: "POST",
			body: JSON.stringify({
				Academic_Id: ID,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				submitBtn.removeAttribute("disabled");
				if (data.success === false) {
					// yes -> collage ID is exist in our database
					console.log(data);
					setCollageIDError(data.message);
					setSubmitBtnContent("Login");
				} else {
					setCollageIDError("");
					setSubmitBtnContent("Confirm");
				}
			})
			.catch((error) => console.error("Error:", error));
	};
	return (
		<div className="ID mb-3">
			<div className="input-group p-2">
				<span className="input-group-text" id="basic-addon1">
					<img src={icon2} alt="" />
				</span>
				<input
					name="ID"
					id="ID"
					type="text"
					className="form-control"
					placeholder="Collage ID"
					aria-label="Collage ID"
					aria-describedby="basic-addon1"
					onChange={(e) => {
						// Validate collage ID syntax here
						if (e.target.value.length < 6) {
							setCollageIDError("Invalid National ID syntax.");
						} else {
							setCollageIDError("");
							// setNationalID(e.target.value);
							collageIDChecker(e.target.value);
						}
					}}
				/>
			</div>
			<h5 className="error">{collageIDError}</h5>
		</div>
	);
};

export default IdInput;
