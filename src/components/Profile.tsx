import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../api";

type UserResponse = {
  username: string;
  email: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest<UserResponse>(
          "/users/v1/me",
          { method: "GET" },
          logout
        );

        if (response.status === "success" && response.data) {
          setUser(response.data);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [logout]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/150"
            alt={`${user.username}'s Profile`}
            className="profile-picture"
          />
          <h1 className="profile-name">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
        </div>
        <div className="profile-body">
          <h2 className="section-title">About Me</h2>
          <p className="profile-bio">
            Software developer passionate about creating amazing user
            experiences.
          </p>
          <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
        </div>
        <div className="profile-footer">
          <button className="profile-button edit-button">Edit Profile</button>
          <button className="profile-button settings-button">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
