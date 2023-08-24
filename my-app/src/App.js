import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import AlumniSignup from "./pages/AlumniSignup";
import OTPVerification from "./pages/OTPVerification";
import CurrantStudentSignup from "./pages/CurrantStudentSignup";
import HRSignup from "./pages/HRSignup";
import ProgressLine from "./components/ProgressLine";
import ForgetPass from "./pages/ForgetPass";
import SendEmail from "./pages/SendEmail";
import AlumniProfile from "./pages/AlumniProfile";
import HRprofile from "./pages/HRprofile";
import StudentProfile from "./pages/StudentProfile";
import AdminProfile from "./pages/AdminProfile";
import ProfessorProfile from "./pages/ProfessorProfile";
import ImgCropper from "./components/img-cropper/ImgCropper";
import LoginLayout from "./layouts/Login-layout";
import GetStarted from "./pages/GetStarted";
import DashboardLayout from "./layouts/Dashboard-layout";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<LandingPage />} />
					<Route path="/roleSelection" element={<RoleSelection />} />
					<Route path="/login" element={<LoginLayout />} />
					<Route path="/resetPass" element={<ForgetPass />} />
					<Route path="/sendEmail" element={<SendEmail />} />

					{/* Private Routes */}
					{/* Private routes are routes that require the user to be authenticated or
					logged in to access them. */}
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<h1>User will see this first</h1>} />
						<Route path="postJob" element={<h1>Post Jobs</h1>} />
						<Route path="applyJob" element={<h1>Apply Jobs</h1>} />
						<Route path="jobsApplications" element={<h1>Applications</h1>} />
					</Route>
					<Route path="/getStarted" element={<GetStarted />} />

					{/* Signup Routes */}
					<Route path="/alumniSignup" element={<AlumniSignup />} />
					<Route path="/studentSignup" element={<CurrantStudentSignup />} />
					<Route path="/hrSignup" element={<HRSignup />} />

					{/* Profile Routes */}
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
