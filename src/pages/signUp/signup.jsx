import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import siteLogo from "../../assets/signin/sitelogo.png";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Input focus states
  const [focusname, setFocusName] = useState(false);
  const [focusphone, setFocusPhone] = useState(false);
  const [focusmail, setFocusMail] = useState(false);
  const [focuspassword, setFocusPassword] = useState(false);
  const [focusrole, setFocusRole] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const API_URL = "https://saikumar99.pythonanywhere.com/api/register/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic client-side validation
    if (!name || !phone || !email || !password || !role) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_URL,
        {
          name: name,
          mobile: phone,
          email: email,
          password: password,
          job_role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Successful registration
      if (response.data && response.data.token) {
        const userData = {
          user: {
            id: response.data.user?.id,
            name: response.data.user?.name || name,
            email: response.data.user?.email || email,
            profilePic:
              response.data.user?.profile_pic ||
              "https://m.media-amazon.com/images/I/51T6MpbpQLL.jpg",
            jobRole: response.data.user?.job_role || role,
            mobile: response.data.user?.mobile || phone,
          },
          token: response.data.token,
        };

        dispatch(login(userData));
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        // Server responded with error status
        if (error.response.data) {
          if (typeof error.response.data === "object") {
            // Handle JSON error responses
            errorMessage =
              error.response.data.message ||
              error.response.data.detail ||
              JSON.stringify(error.response.data);
          } else {
            // Handle HTML responses (like Django debug page)
            errorMessage = "Server error occurred. Check console for details.";
            console.error("Server returned:", error.response.data);
          }
        }
      } else if (error.request) {
        // No response received
        errorMessage = "No response from server. Check your connection.";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="signup-page" onSubmit={handleSubmit}>
        <div className="signup-img">
          <img src={siteLogo} alt="Site Logo" />
          <p>Turn ideas into action - stay organized, stay ahead.</p>
        </div>
        <div className="signup-form">
          <div className="signup-cointained">
            <div className="welcome-signup">Sign Up</div>

            {/* Name Field */}
            <div
              className={`username-cointainer-up ${
                focusname ? "user-border" : ""
              }`}
              onFocus={() => setFocusName(true)}
              onBlur={() => setFocusName(false)}
            >
              <input
                className="inputdata"
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone Field */}
            <div
              className={`username-cointainer-up ${
                focusphone ? "user-border" : ""
              }`}
              onFocus={() => setFocusPhone(true)}
              onBlur={() => setFocusPhone(false)}
            >
              <input
                className="inputdata increment-decrement-signup"
                placeholder="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Role Selection */}
            <div
              className={`username-cointainer-up ${
                focusrole ? "user-border" : ""
              }`}
              onFocus={() => setFocusRole(true)}
              onBlur={() => setFocusRole(false)}
            >
              <select
                className="inputdata"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Job Role</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User Employee">User Employee</option>
              </select>
            </div>

            {/* Email Field */}
            <div
              className={`username-cointainer-up ${
                focusmail ? "user-border" : ""
              }`}
              onFocus={() => setFocusMail(true)}
              onBlur={() => setFocusMail(false)}
            >
              <input
                type="email"
                className="username"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div
              className={`password-cointainer-up ${
                focuspassword ? "mail-border" : ""
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                className="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? (
                  <svg
                    className="openeye-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg
                    className="closeeye-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="login-button-up"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>

            <p id="changer-link-signup">
              Already have an account?{" "}
              <Link to="/sign-in" className="link-up">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
