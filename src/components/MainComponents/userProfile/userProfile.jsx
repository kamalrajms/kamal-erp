import React, { useEffect, useRef, useState } from "react";
import "./userProfile.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserProfile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(user);
  const BackFromProfile = useNavigate();
  const inputRef = useRef(0);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://saikumar99.pythonanywhere.com/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setUserDetails((prev) => ({ ...prev, ...data }));
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setUserDetails((prev) => {
        return {
          ...prev,
          profilePic: preview,
        };
      });

      // Prepare form data for image upload
      const formData = new FormData();
      formData.append("profile_pic", file);

      try {
        const response = await fetch(
          "https://saikumar99.pythonanywhere.com/api/profile/",
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload profile picture");
        }

        toast.success("Profile Picture Uploaded Successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  function handleDetailChange(e) {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://saikumar99.pythonanywhere.com/api/profile/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_role: userDetails.jobRole,
            mobile: userDetails.mobile,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      toast.success("Profile updated successfully");
      BackFromProfile(-1);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="userProfile">
      <nav>
        <div className="profife-cointainer">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            hidden
          />
          <img
            className="profilePicture"
            src={userDetails.profilePic}
            alt=""
            onClick={() => {
              inputRef.current.click();
            }}
          />
          .<h2>{userDetails.name}</h2>
          <h2>{userDetails.email}</h2>
        </div>
      </nav>

      <form className="profile-info" onSubmit={handleSubmit}>
        <div className="box-layout-coinntainer">
          <p>Job role</p>
          <input
            type="text"
            id="jobRole"
            value={userDetails.jobRole || ""}
            onChange={handleDetailChange}
          />
        </div>

        <div className="box-layout-coinntainer">
          <p>Mobile Number</p>
          <input
            type="text"
            id="mobile"
            value={userDetails.mobile || ""}
            onChange={handleDetailChange}
          />
        </div>

        <div className="profile-submit-cointainer">
          <button type="submit" className="profile-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
