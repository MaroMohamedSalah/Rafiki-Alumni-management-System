import icon1 from "../imgs/sign up 1.svg";
import { baseBackendUrl } from "../utils/baseBackendUrl";
const NationalIdInput = ({
	nationalIDError,
	setNationalIDError,
	setSubmitBtnContent,
	isMain,
}) => {
	// check if national id is exist in database
	const NIDchecker = (national_ID) => {
		const submitBtn = document.querySelector(".Signup form .submit button");
		isMain === true && submitBtn.setAttribute("disabled", true);
		fetch(`${baseBackendUrl}/users/check_national_id`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				NID: national_ID,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				isMain === true && submitBtn.removeAttribute("disabled");
				if (data.success === false) {
					// yes -> national ID is exist in our database
					console.log(data);
					// setIsNIDexist(true);
					setNationalIDError(data.message);
					isMain === true && setSubmitBtnContent("Login");
				} else {
					// setIsNIDexist(false);
					setNationalIDError("");
					isMain === true && setSubmitBtnContent("Confirm");
				}
			})
			.catch((error) => console.error("Error:", error));
	};
	return (
		<div className="nationalID mb-3">
			<div className="input-group p-2">
				<span className="input-group-text" id="basic-addon1">
					<img src={icon1} alt="" />
				</span>
				<input
					name="National_Id"
					id="NID"
					type="text"
					className="form-control"
					placeholder="National ID"
					aria-label="National ID"
					aria-describedby="basic-addon1"
					onChange={(e) => {
						// Validate national ID syntax
						const regex = /^[0-9]{14}$/; // Regular expression for 14 digits
						if (!regex.test(e.target.value)) {
							setNationalIDError("Invalid National ID syntax.");
						} else {
							setNationalIDError("");
							// setNationalID(e.target.value);
							NIDchecker(e.target.value);
						}
					}}
				/>
			</div>
			<h5 className="error">{nationalIDError}</h5>
		</div>
	);
};

export default NationalIdInput;
