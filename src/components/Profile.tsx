import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useApi } from "../ApiContext";

type UserResponse = {
  username: string;
  email: string;
  bio?: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [bio, setBio] = useState<string>(
    "Software developer passionate about creating amazing user experiences."
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { fetch } = useApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/users/v1/me", { method: "GET" });

        if (response.ok) {
          const data: UserResponse = await response.json();
          setUser(data);
          setBio(data.bio || bio);
          setError(null);
        } else {
          setError(response.statusText || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true); // Show loading state while saving
      const response = await fetch("/users/v1/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });

      if (response.ok) {
        setUser((prev) => ({ ...prev!, bio })); // Update user bio locally
        setIsEditing(false); // Exit editing mode
      } else {
        setError(response.statusText || "Failed to save bio.");
      }
    } catch (err) {
      console.error("Error saving bio:", err);
      setError("An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

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
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="profile-bio-input"
            />
          ) : (
            <p className="profile-bio">{bio}</p>
          )}
          <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
        </div>
        <div className="profile-footer">
          {isEditing ? (
            <>
              <button
                className="profile-button save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="profile-button cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="profile-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Bio
            </button>
          )}
          {!isEditing && (
            <button className="profile-button settings-button">
              Account Settings
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
