import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ProfileProgress from "./ProfileProgress";

const ProfileCV = ({ progressPercentage }) => {
	return (
		<section className={"ProfileCV sec"}>
			<h1 className="sec-title position-relative">
				Profile & CV
				<OverlayTrigger
					overlay={
						<Tooltip id="my-tooltip" style={{ marginRight: "10px" }}>
							Visibility
						</Tooltip>
					}
					placement="left"
				>
					<div className="visibility position-absolute">
						<i className="fa-solid fa-earth-americas"></i>
					</div>
				</OverlayTrigger>
			</h1>
			<div>
				<button className="btn uploadCV fw-bold">
					<span className="icon me-2">
						<i className="fa-solid fa-arrow-up-from-bracket"></i>
					</span>{" "}
					Upload CV..
				</button>

				<ProfileProgress progress={progressPercentage} />
			</div>
		</section>
	);
};

export default ProfileCV;
