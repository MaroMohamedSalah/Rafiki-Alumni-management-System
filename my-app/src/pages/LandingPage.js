import { Link } from "react-router-dom";
import "./LandingPage.css";
import Cursor from "../components/Cursor";
const LandingPage = () => {
	return (
		<div className="LandingPage vh-100">
			<Cursor />
			<div className="container h-100">
				<div className="h-75 flex-column flex-md-row d-flex justify-content-center align-items-center">
					<Link to={"./login"} className="btn p-3 m-5">
						<h2>Login</h2>
					</Link>
					<Link to={"./getStarted"}>
						<button className="btn p-3 m-5">Signup</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LandingPage;
