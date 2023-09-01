import { Link } from "react-router-dom";

const BackToProfileBtn = () => {
	return (
		<Link to={"../"} className="backToProfile btn d-none d-md-block">
			<span className="me-3 icon">
				<i class="fa-solid fa-circle-chevron-left"></i>
			</span>
			Back To Profile
		</Link>
	);
};

export default BackToProfileBtn;
