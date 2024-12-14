import React from "react";
import "./About.css";
import Sai from "../img/programmer-svgrepo-com.svg";
import Noah from "../img/programmer-svgrepo-com.svg";
import Patrick from "../img/programmer-svgrepo-com.svg";
import Eren from "../img/programmer-svgrepo-com.svg";
//import Eren from "../img/266.webp";

interface TeamMember {
  image: string; // URL for the member's picture
  name: string; // Name of the team member
  role: string; // Role of the team member
  description?: string; // Description for the team member
  url?: string;
}

const TeamPage: React.FC = () => {
  const teamName = "The Team";
  const teamDescription =
    "We are a team of talented individuals working together to build amazing projects!";
  const teamMembers = [
    {
      image: Sai,
      name: "Saimaneesh",
      role: "Frontend Developer",
      description:
        "Saimaneesh is a creative problem-solver who specializes in building intuitive and responsive interfaces. With a keen eye for detail and a passion for delivering seamless user experiences, Sai ensures every pixel has a purpose. Outside of work, Sai enjoys exploring new technologies and contributing to open-source projects.",
      url: "https://www.linkedin.com/in/saimaneesh-yeturu-ba3998292/",
    },
    {
      image: Noah,
      name: "Noah",
      role: "Backend Developer",
      description:
        "Noah is the backbone of the team’s technical infrastructure. With expertise in crafting efficient and scalable backend systems, he ensures seamless communication between the frontend and database layers. Noah thrives on solving complex problems, writing clean code, and optimizing performance. Beyond coding, his quick wit and approachable personality make him a joy to collaborate with, spreading positivity throughout the team.",
      url: "https://gerberservices.com",
    },
    {
      image: Patrick,
      name: "Patrick",
      role: "UI/UX Designer",
      description:
        "Patrick is a master of crafting visually stunning and user-friendly designs. With a passion for blending functionality with aesthetics, Patrick transforms ideas into engaging digital experiences. When not designing, you’ll find Patrick sketching, exploring art galleries, or curating his inspiration board.",
      url: "",
    },
    {
      image: Eren,
      name: "Eren",
      role: "Project Manager",
      description:
        "Eren is the backbone of the team, ensuring that everything runs smoothly and on time. With exceptional organizational skills and a knack for fostering collaboration, Eren keeps the team motivated and focused. When not juggling tasks, Eren enjoys diving into the latest tech trends and brainstorming innovative solutions.",
      url: "https://www.linkedin.com/in/eren-homburg-8abba12bb",
    },
  ];

  return (
    <div className="team-container">
      <h1 className="team-name">{teamName}</h1>
      <p className="team-description">{teamDescription}</p>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img
              src={member.image}
              alt={`${member.name}'s profile`}
              className="team-member-image"
            />
            <h2 className="team-member-name">
              {member.url ? (
                <a href={member.url} target="blank">
                  {member.name}
                </a>
              ) : (
                member.name
              )}
            </h2>
            <h3 className="team-member-role">{member.role}</h3>
            <div
              className="team-member-description"
              dangerouslySetInnerHTML={{ __html: member.description || "" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
