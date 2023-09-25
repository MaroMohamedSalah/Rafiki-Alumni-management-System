import { Link } from "react-router-dom";
import "./LandingPage.css";
import Cursor from "../components/Cursor";
import Logo from "../components/Logo";
import { Divider } from "@mui/material/node";
import introImg from "../imgs/landing_page_intro.png";
const LandingPage = () => {
	return (
		<div className="LandingPage vh-100">
			<Cursor />
			{/* start nav  */}
			<nav>
				<div className="container d-flex justify-content-between align-items-center py-2">
					<h1>Logo</h1>
					<div className="d-flex">
						<Link to={"./login"} className="btn login me-4 py-2 px-3">
							<h5>Login</h5>
						</Link>
						<Link to={"./getStarted"} className="btn signup py-2 px-3">
							<h5>Signup</h5>
						</Link>
					</div>
				</div>
			</nav>
			{/* end nav  */}
			{/* start intro  */}
			<div className="section intro">
				<div className="container py-5">
					<div className="row py-5">
						<div className="col-12 col-lg-6">
							<h1>Discover Rafiki</h1>
							<h2>Your College's All-in-One Hub</h2>
							<p className="text-black-50">
								Join our unique community, uniting students, graduates, faculty,
								and administrators. Explore discussions, jobs, ask questions,
								materials, and more!
							</p>
							<div className="d-flex justify-content-center flex-column align-items-center my-5">
								<Link to={"./getStarted"} className="btn signup py-2 px-3">
									<h5>Join Now</h5>
								</Link>
								<Divider className="w-100 my-3">OR</Divider>
								<Link to={"./login"} className="btn login py-2 px-3">
									<h5>Already a member? Log in</h5>
								</Link>
							</div>
						</div>
						<div className="col-12 col-lg-6">
							<img
								src={introImg}
								className="img-fluid"
								alt="introImg"
								srcset=""
							/>
						</div>
					</div>
				</div>
			</div>
			{/* end intro  */}
		</div>
	);
};
export default LandingPage;
