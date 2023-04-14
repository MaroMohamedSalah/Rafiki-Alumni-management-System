import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import AlumniSignup from "./pages/AlumniSignup";
import OTPVerification from "./pages/OTPVerification";
import CurrantStudentSignup from "./pages/CurrantStudentSignup";
import HRSignup from "./pages/HRSignup";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact={true} path="/" element={<LandingPage />} />
					<Route path="/roleSelection" element={<RoleSelection />} />
					<Route path="/alumniSignup" element={<AlumniSignup />} />
					<Route path="/StudentSignup" element={<CurrantStudentSignup />} />
					<Route path="/hrSignup" element={<HRSignup />} />
					{/* <Route path="/OTP" element={<OTPVerification />} /> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
