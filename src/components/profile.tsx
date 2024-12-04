import React from "react";
import "./profile.css";
import auth from "./login";

const Profile: React.FC = () => {
  const user = {
    name: auth.name,
    email: "john.doe@example.com",
    bio: "Software developer passionate about creating amazing user experiences.",
    profilePicture: "https://via.placeholder.com/150", // Replace with your own URL or user-uploaded image
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.profilePicture}
            alt={`${user.name}'s Profile`}
            className="profile-picture"
          />
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
        </div>
        <div className="profile-body">
          <h2 className="section-title">About Me</h2>
          <p className="profile-bio">{user.bio}</p>
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
