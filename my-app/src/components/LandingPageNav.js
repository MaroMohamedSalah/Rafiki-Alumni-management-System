import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const LandingPageNav = () => {
	const [scrolling, setScrolling] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 50 ? setScrolling(true) : setScrolling(false);
		});

		// Don't forget to remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", () => {
				window.scrollY > 50 ? setScrolling(true) : setScrolling(false);
			});
		};
	}, []);

	return (
		<nav className={scrolling ? "shadow-sm" : ""}>
			<div className="container d-flex justify-content-between align-items-center py-2">
				<div className={`navLogo ${scrolling ? "scrollHight" : ""}`}>
					<Logo dark />
				</div>
				<div className="d-flex">
					<Link to={"./login"} className="btn login me-4 py-2 px-3 rounded-5">
						<h5>Login</h5>
					</Link>
					<Link to={"./getStarted"} className="btn signup py-2 px-3 rounded-5">
						<h5>Signup</h5>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default LandingPageNav;
