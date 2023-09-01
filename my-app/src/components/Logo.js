import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const Logo = ({ to }) => {
	const isMobile = window.innerWidth <= 768;
	let logoStyle = {
		height: "50px",
		display: "block",
		top: "-32px",
	};
	if (isMobile) {
		logoStyle = {
			height: "50px",
			display: "block",
			top: "8px",
		};
	}
	return (
		<Link to={to} className="logo" style={logoStyle}>
			<img src={logo} alt="" className="img-fluid h-100" />
		</Link>
	);
};

export default Logo;
