import React from "react";
import "./About.css";
import Sai from "../img/programmer-svgrepo-com.svg";
import Noah from "../img/programmer-svgrepo-com.svg";
import Patrick from "../img/programmer-svgrepo-com.svg";
import Eren from "../img/programmer-svgrepo-com.svg";

interface TeamMember {
  image: string; // URL for the member's picture
  name: string; // Name of the team member
  description: string; // Description for the team member
  url?: string;
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
      url: "https://www.linkedin.com/in/saimaneesh-yeturu-ba3998292/",
    },
    {
      image: Noah,
      name: "Noah",
      description:
        "Backend Developer <br> <br> Meet Noah the ultimate charmer who seems to have mastered the universal language of wit and confidence. Whether it’s the barista brewing his coffee, the elderly neighbor tending her roses, or the group of friends at the next table, he’s got a knack for making everyone feel special. With a mischievous grin, a pocket full of clever compliments, and the uncanny ability to leave anyone smiling, Noah isn’t bound by age or circumstance. He’s not just smooth—he’s a walking rom-com, spreading warmth, laughter, and maybe just a little blush wherever he goes.",
      url: "https://gerberservices.com/",
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
      url: "https://www.linkedin.com/in/eren-homburg-8abba12bb/",
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
