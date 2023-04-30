import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Keypad from "../imgs/Keypad.svg";

const ProfileContactInfoSec = () => {
	const [isEmpty, setIsEmpty] = useState(true);
	const [email, setEmail] = useState("");
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
			<div className="not-empty-sec">
				<h1>
					<span className="icon">
						<img src={Keypad} alt="" />
					</span>
					<span className="text-black-50">Add your phone number here</span>
				</h1>
				<h1>
					<span className="icon">
						<i className="fa-regular fa-envelope"></i>
					</span>{" "}
					{email.length === 0 ? (
						<p class="placeholder-glow w-50">
							<span class="placeholder w-50"></span>
						</p>
					) : (
						email
					)}
				</h1>
			</div>
		</section>
	);
};

export default ProfileContactInfoSec;
