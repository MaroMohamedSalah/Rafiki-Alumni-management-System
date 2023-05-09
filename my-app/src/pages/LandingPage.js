import { Link } from "react-router-dom";
import "./LandingPage.css";
import ProgressLine from "../components/ProgressLine";
const LandingPage = () => {
	return (
		<div className="LandingPage vh-100">
			<div className="container h-100">
				<div className="h-75 flex-column flex-md-row d-flex justify-content-center align-items-center">
					<Link to={"./login"}>
						<button className="btn p-3 m-5">Login</button>
					</Link>
					<Link to={"./roleSelection"}>
						<button className="btn p-3 m-5">Signup</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LandingPage;
