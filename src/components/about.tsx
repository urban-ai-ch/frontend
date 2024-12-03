import React from "react";
import "./about.css";
import Sai from "../img/266.webp";
import Noah from "../img/266.webp";
import Patrick from "../img/266.webp";
import Eren from "../img/266.webp";

interface TeamMember {
  image: string; // URL for the member's picture
  name: string; // Name of the team member
  description: string; // Description for the team member
}

const TeamPage: React.FC = () => {
  const teamName = "Teamoty Roscoe";
  const teamDescription =
    "We are a team of talented individuals working together to build amazing projects!";
  const teamMembers: TeamMember[] = [
    {
      image: Sai,
      name: "Sai",
      description: "Frontend Developer",
    },
    {
      image: Noah,
      name: "Noah",
      description:
        "Backend Developer <br> <br> Meet Noah the ultimate charmer who seems to have mastered the universal language of wit and confidence. Whether it’s the barista brewing his coffee, the elderly neighbor tending her roses, or the group of friends at the next table, he’s got a knack for making everyone feel special. With a mischievous grin, a pocket full of clever compliments, and the uncanny ability to leave anyone smiling, [Name] isn’t bound by age or circumstance. He’s not just smooth—he’s a walking rom-com, spreading warmth, laughter, and maybe just a little blush wherever he goes.",
    },
    {
      image: Patrick,
      name: "Patrick",
      description: "UI/UX Designer",
    },
    {
      image: Eren,
      name: "Eren",
      description: "Project Manager",
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
            <h2 className="team-member-name">{member.name}</h2>
            <div
              className="team-member-description"
              dangerouslySetInnerHTML={{ __html: member.description }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
