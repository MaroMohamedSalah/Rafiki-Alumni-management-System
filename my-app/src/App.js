import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import AlumniSignup from "./pages/AlumniSignup";
import CurrantStudentSignup from "./pages/CurrantStudentSignup";
import HRSignup from "./pages/HRSignup";
import LoginLayout from "./layouts/Login-layout";
import GetStarted from "./pages/GetStarted";
import DashboardLayout from "./layouts/Dashboard-layout";
import ProfileLayout from "./layouts/Profile-layout";
import ProfileContent from "./pages/ProfileContent";
import AddSkills from "./pages/AddSkills";
import ResetPassLayout from "./layouts/ResetPass-layout";
import ResetPassEmail from "./pages/ResetPassEmail";
import CheckYourEmail from "./pages/CheckYourEmail";
import CreateNewPassword from "./pages/CreateNewPass";
import CreateNewPassSuccess from "./pages/CreateNewPasswordSuccess";
import PostJobs from "./pages/PostJobs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PostIntern from "./pages/PostIntern";
import ApplyJobLayout from "./layouts/ApplyJob-layout";
import JobDetail from "./components/jobsComponents/JobDetail";
import GetStartedAr from "./pages/GetStartedAr";
import Signup from "./pages/Signup";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import UploadMaterials from "./pages/UploadMaterials/UploadMaterials";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/roleSelection" element={<RoleSelection />} />
            <Route path="/login" element={<LoginLayout />} />
            <Route path="/resetPass" element={<ResetPassLayout />}>
              <Route index element={<ResetPassEmail />} />
              <Route path="checkYourEmail" element={<CheckYourEmail />} />
              <Route
                path="createNewPassword/:token"
                element={<CreateNewPassword />}
              />
              <Route
                path="createNewPasswordSuccess"
                element={<CreateNewPassSuccess />}
              />
            </Route>
            {/* Private Routes */}
            {/* Private routes are routes that require the user to be authenticated or
	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<BrowserRouter>
					<Routes>
						{/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/roleSelection" element={<RoleSelection />} />
            <Route path="/login" element={<LoginLayout />} />
            <Route path="/resetPass" element={<ResetPassLayout />}>
              <Route index element={<ResetPassEmail />} />
              <Route path="checkYourEmail" element={<CheckYourEmail />} />
              <Route
                path="createNewPassword/:token"
                element={<CreateNewPassword />}
              />
              <Route
                path="createNewPasswordSuccess"
                element={<CreateNewPassSuccess />}
              />
            </Route>
            {/* Private Routes */}
            {/* Private routes are routes that require the user to be authenticated or
					logged in to access them. */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* <Route index element={<h1>User will see this first</h1>} /> */}
              <Route path="postJob" element={<PostJobs />} />
              <Route path="postIntern" element={<PostIntern />} />
              <Route
                path="/dashboard/uploadMaterial"
                element={<UploadMaterials />}
              />

              <Route path="applyJob" element={<ApplyJobLayout />}>
                <Route index path=":jobId" element={<JobDetail />} />
              </Route>
              <Route
                path="jobsApplications"
                element={<ComingSoon date={"01/11/2023"} />}
              />
            </Route>
            <Route path="/getStarted" element={<GetStarted />} />
            <Route path="/getStartedAr" element={<GetStartedAr />} />
            {/* Signup Routes */}
            <Route path="/alumniSignup" element={<AlumniSignup />} />
            <Route path="/signup/:actor" element={<Signup />} />
            <Route path="/studentSignup" element={<CurrantStudentSignup />} />
            <Route path="/hrSignup" element={<HRSignup />} />
            {/* Profile Routes */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<ProfileContent />} />
              <Route path="addSkills" element={<AddSkills />} />
            </Route>
            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
