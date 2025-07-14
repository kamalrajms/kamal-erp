import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import siteLogo from "../../assets/signin/sitelogo.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // controlling inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [focusname, setfocusName] = useState(false);
  const [focusphone, setfocusPhone] = useState(false);
  const [focusjob, setfocusjob] = useState(false);
  const [focusmail, setfocusmail] = useState(false);
  const [focuspassword, setfocuspassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://saikumar99.pythonanywhere.com/api/register/",
        {
          name: name,
          mobile: phone,
          email: userMail,
          password: password,
          job_role: role,
        }
      );

      if (response.data) {
        const userData = {
          user: {
            id: response.data.user?.id || 1,
            name: response.data.user?.name || name,
            email: response.data.user?.email || userMail,
            profilePic:
              response.data.user?.profile_pic ||
              "https://m.media-amazon.com/images/I/51T6MpbpQLL.jpg",
            jobRole: response.data.user?.job_role || role,
            mobile: response.data.user?.mobile || phone,
          },
          token: response.data.token,
        };
        dispatch(login(userData));
        toast.success("Signed up successfully!!");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          toast.error(error.response.data.message || "Registration failed");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form className="signup-page" onSubmit={handleSignIn}>
        {/* REST OF THE EXACT SAME JSX */}
        {/* ... all your existing JSX remains unchanged ... */}
        <button type="submit" className="login-button-up" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
