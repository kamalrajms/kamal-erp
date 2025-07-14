import React, { useEffect, useRef, useState } from "react";
import "./userProfile.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function userProfile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(user);
  const BackFromProfile = useNavigate();

  const inputRef = useRef(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://saikumar99.pythonanywhere.com/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, [user.token]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_pic", file);

      try {
        setIsLoading(true);
        const response = await axios.put(
          "https://saikumar99.pythonanywhere.com/api/profile/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const preview = URL.createObjectURL(file);
        setUserDetails((prev) => ({
          ...prev,
          profilePic: preview,
        }));
        toast.success("Profile Picture Uploaded Successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload profile picture");
      } finally {
        setIsLoading(false);
      }
    }
  };

  function handleDetailChange(e) {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        "https://saikumar99.pythonanywhere.com/api/profile/",
        {
          job_role: userDetails.jobRole,
          mobile: userDetails.mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Profile updated successfully");
      BackFromProfile(-1);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
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
          <h2>{userDetails.name}</h2>
          <h2>{userDetails.email}</h2>
        </div>
      </nav>

      <form className="profile-info" onSubmit={handleSubmit}>
        <div className="box-layout-coinntainer">
          <p>Job role</p>
          <input
            type="text"
            id="jobRole"
            value={userDetails.jobRole}
            onChange={handleDetailChange}
          />
        </div>

        <div className="box-layout-coinntainer">
          <p>Mobile Number</p>
          <input
            type="text"
            id="mobile"
            value={userDetails.mobile}
            onChange={handleDetailChange}
          />
        </div>

        <div className="profile-submit-cointainer">
          <button type="submit" className="profile-submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
