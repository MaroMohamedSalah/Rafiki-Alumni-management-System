import { Link } from "react-router-dom";
import logoDark from "../imgs/logo-picdark-shfaf.png";
import logoLight from "../imgs/logo-pic-accent.png";

const Logo = ({ to, dark }) => {
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
			{dark ? (
				<img src={logoDark} alt="" className="img-fluid h-100" />
			) : (
				<img src={logoLight} alt="" className="img-fluid h-100" />
			)}
		</Link>
	);
};

export default Logo;
