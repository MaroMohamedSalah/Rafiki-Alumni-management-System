import React, { useEffect, useState } from "react";
import "./dashboard.css";
import DashboardNav from "../components/DashboardNav";
import "animate.css";
import DashboardSidebar from "../components/DashboardSidebar";
import Loading from "../components/Loading";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../redux/actions/profileActions";
import JoinTelegramNotification from "../components/JoinTelegramNotification";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const DashboardLayout = () => {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const sideBarIsOpen = useSelector(
    (state) => state.dashboard.sidebar.sideBarIsOpen
  );
  const profile = useSelector((state) => state.profile);
  const userInfo = profile.userInfo;
  const dispatch = useDispatch();

  // Make API request and update profile in the Redux store
  const fetchProfileData = async () => {
    fetch(`${baseBackendUrl}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionId}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          // Redirect to login page
          RedirectToLoginNotification();
          localStorage.removeItem("sessionId");
          navigate("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.success === true) {
          updateUserInfo(dispatch, data);
        }
      })
      .catch((error) => {
        console.log("Error while fetching profile data:", error);
      });
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="Dashboard">
      {userInfo && userInfo.user && profile ? (
        <div className="container-fluid vh-100">
          <DashboardSidebar profileData={userInfo.user} />

          <div
            className={`dashboard-wrapper ${sideBarIsOpen && "sidebar-open"}`}
          >
            <DashboardNav profileData={userInfo.user} />
            <div className="content">
              <div className="content-container">
                <Outlet />
              </div>
            </div>
          </div>
          <JoinTelegramNotification />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DashboardLayout;
