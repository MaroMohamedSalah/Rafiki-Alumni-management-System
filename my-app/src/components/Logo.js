import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const Logo = ({ to }) => {
	const logoStyle = {
		height: "50px",
		display: "block",
	};
	return (
		<Link to={to} className="logo" style={logoStyle}>
			<img src={logo} alt="" className="img-fluid h-100" />
		</Link>
	);
};

export default Logo;
