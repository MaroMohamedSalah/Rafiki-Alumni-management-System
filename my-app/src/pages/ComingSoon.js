import { Link } from "react-router-dom";
import icon from "../imgs/comingSoonIcon.png";
import "./comingSoon.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
const ComingSoon = ({ date }) => {
	return (
		<div className="ComingSoon">
			<div className="container d-flex justify-content-between align-items-center flex-column">
				<h1 className="title mt-0">Coming Soon</h1>
				<h6 className="subtitle">we will launch this feature soon.</h6>
				<div className="image my-3">
					<img src={icon} alt="icon" className="img-fluid" />
				</div>
				<h6 className="launchDate my-3">It may be ready by: {date}</h6>
				<h6 className="subtitle my-3">
					And follow us on our social media accounts
				</h6>
				<ul className="social list-unstyled d-flex justify-content-between mb-0">
					<li>
						<Link
							to={"https://www.facebook.com/rafikiFCAIHu"}
							className="m-2 facebook text-white-50"
							target="_blank"
						>
							<FacebookIcon fontSize="medium" />
						</Link>
					</li>
					<li>
						<Link
							to={"https://www.instagram.com/rafiki_fcai/"}
							className="m-2 instagram  text-white-50"
							target="_blank"
						>
							<InstagramIcon fontSize="medium" />
						</Link>
					</li>
					<li>
						<Link
							to="mailto:rafiki.questions@gmail.com"
							className="m-2 email text-white-50"
							target="_blank"
						>
							<EmailIcon fontSize="medium" />
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ComingSoon;
