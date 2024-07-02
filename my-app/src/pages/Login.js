import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import Backbtn from "../components/Backbtn";
import loginImg from "../imgs/login-img.svg";
import icon1 from "../imgs/sign up 3.svg";
import icon2 from "../imgs/sign up 5.svg";
import show from "../imgs/show password.svg";
import hide from "../imgs/hide password.svg";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/actions/profileActions";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputsValues = (inputs) => {
    let error = false;

    Array.from(inputs).forEach((input) => {
      if (input[1].length === 0) {
        error = true;
        console.error(`Error: ${input[0]} is required`);
        switch (input[0]) {
          case "username":
            setUsernameError(`${input[0]} is required`);
            break;
          case "password":
            setPasswordError(`${input[0]} is required`);
            break;
          default:
            break;
        }
      }
    });
    return error;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector(".Auth form .submit button");
    const form = document.querySelector(".Login form");

    const formData = new FormData(form);
    let anyInputIsEmpty = validateInputsValues(formData);
    if (!usernameError && !passwordError && !anyInputIsEmpty) {
      submitBtn.setAttribute("disabled", true);

      try {
        const response = await fetch(`${baseBackendUrl}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            UserName: formData.get("username"),
            Password: formData.get("password"),
          }),
          headers: {
            "Content-Type": "application/json",
            "Demo-Code": "demo2023",
          },
        });

        const data = await response.json();

        submitBtn.removeAttribute("disabled");
        if (response.status === 200) {
          localStorage.setItem("sessionId", data.sessionId);

          fetchUserData(data.sessionId);

          Swal.fire({
            title: "Success!",
            text: `You Logged in successfully, as ${data.actor}!`,
            icon: "success",
          });

          navigate(`/dashboard?username=${data.user_name}`);

          console.log("Logged in successfully!", data);
        } else {
          console.error("Error: " + data.message);
          setPasswordError("Password or Username may be incorrect");
          setUsernameError("Password or Username may be incorrect");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    }
  };

  const displayNotification = (username) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("Welcome Back!", {
        body: `Hey there, ${username}! Thanks for logging in. Check out your profile.`,
      });

      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 200, 50, 100]);
      } else {
        console.log("Vibration not supported on this device.");
      }
    }
  };

  // Make API request and set userinfo in the Redux store
  const fetchUserData = async (sessionId) => {
    try {
      const response = await fetch(`${baseBackendUrl}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionId}`,
        },
      });

      if (response.status === 401) {
        // Redirect to login page
        // RedirectToLoginNotification();
        // navigate("/login");
      } else {
        const data = await response.json();
        if (data.success === true) {
          // Dispatch the action to update the profile in the Redux store
          setUserInfo(dispatch, data);
        }
      }
    } catch (error) {
      console.log("Error while fetching profile data:", error);
    }
  };

  return (
    <div className="Auth Login">
      <div className="container-fluid">
        <Backbtn
          btnColor="var(--secondary-bg-color)"
          btnSize="25px"
          btnTop="10px"
          btnColorMobile="var(--primary-color)"
          btnSizeMobile="15px"
          btnTopMobile="10px"
        />
        <div className="row">
          <div className="col-12 col-md-6 d-none d-md-flex justify-content-around align-items-center flex-column">
            <img src={loginImg} alt="" />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center rightPart">
            <div className="introText p-4 w-100">
              <h1>Welcome Again!</h1>
              <p className="text-black-50">welcome back again to us </p>
            </div>
            <div className="form w-75">
              <form action="#" method="post" onSubmit={handelSubmit}>
                <div className="username mb-3">
                  <div className="input-group p-2">
                    <span className="input-group-text" id="basic-addon1">
                      <img src={icon1} alt="" />
                    </span>
                    <input
                      name="username"
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        const regex = /^[a-zA-Z0-9_]{3,20}$/;
                        setUsernameError(
                          regex.test(e.target.value.trim())
                            ? ""
                            : "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
                        );
                      }}
                    />
                  </div>
                  <h5 className="error">{usernameError}</h5>
                </div>

                <div className="password mb-3">
                  <div className="input-group p-2">
                    <span className="input-group-text" id="basic-addon1">
                      <img src={icon2} alt="" />
                    </span>
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        setPasswordError(
                          e.target.value.length < 6
                            ? "Invalid Password length"
                            : ""
                        );
                      }}
                    />
                    <span className="input-group-text" id="basic-addon1">
                      {showPassword ? (
                        <img
                          src={hide}
                          alt=""
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <img
                          src={show}
                          alt=""
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </span>
                  </div>
                  <h5 className="error">{passwordError}</h5>
                </div>
                <div className="submit text-center w-100">
                  <button className="btn px-5 w-75" type="submit">
                    Submit
                  </button>
                </div>
                <h5 className="text-center forgetPass my-3">
                  forget password?{" "}
                  <Link className="d-block d-md-inline" to="/resetPass">
                    Reset Password
                  </Link>{" "}
                </h5>
              </form>
            </div>
            <div className="toSignup d-flex justify-content-center align-items-center w-100 mb-3 position-absolute bottom-0">
              <h5 className="m-0">Not A Member ? </h5>
              <span>
                <Link to="/roleSelection">
                  <button className="btn px-4 py-1 fs-6 text mx-4">
                    Signup
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
