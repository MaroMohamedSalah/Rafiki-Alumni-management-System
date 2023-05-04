import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import AlumniSignup from "./pages/AlumniSignup";
import OTPVerification from "./pages/OTPVerification";
import CurrantStudentSignup from "./pages/CurrantStudentSignup";
import HRSignup from "./pages/HRSignup";
import ProgressLine from "./components/ProgressLine";
import Login from "./pages/Login";
import ForgetPass from "./pages/ForgetPass";
import SendEmail from "./pages/SendEmail";
import AlumniProfile from "./pages/AlumniProfile";
import HRprofile from "./pages/HRprofile";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact={true} path="/" element={<LandingPage />} />
					<Route path="/roleSelection" element={<RoleSelection />} />
					<Route path="/alumniSignup" element={<AlumniSignup />} />
					<Route path="/studentSignup" element={<CurrantStudentSignup />} />
					<Route path="/hrSignup" element={<HRSignup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/resetPass" element={<ForgetPass />} />
					<Route path="/sendEmail" element={<SendEmail />} />
					<Route path="/alumniProfile" element={<AlumniProfile />} />
					<Route path="/hrProfile" element={<HRprofile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
