import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUser } from "../../services/user";
import ProfilePicture from "../../components/ProfilePicture";
<<<<<<< HEAD
import "./anotherUserProfile.css";
=======
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import IconButton from "@mui/material/IconButton";
// import Burger from "../../components/Burger";
// import { Container } from "rsuite";
>>>>>>> main

const OtherProfilePage = ({ userId, setCheckProfile }) => {
  const [chatting, setChatting] = useState(false);
  const [chatterId, setChatterId] = useState("");
  // const userId = useParams().userId;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    forename: "",
    lastName: "",
    profilePicture: "",
    proficiencyLevel: "",
    age: "",
    gender: "",
    location: "",
    experience: "",
    projects: [],
    languages: [],
    technologies: [],
    techStack: [],
    job: "",
    bio: "",
    url: "",
    lookingFor: {
      proficiencyLevel: [],
      techStack: [],
      projectType: [],
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("fetchdata");
      console.log("userid", userId);
      try {
        const data = await getOneUser(token, userId);
        console.log("data.user", data.user);
        setUser(data.user);
        localStorage.setItem("token", data.token);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    setCheckProfile(false);
  };

  return (
    <>
<<<<<<< HEAD
      <HomeButton />
      <LogOutButton />
      <div className="otherUserContainer">
        <div className="otherUserPictureAndDetailsContainer">
          <ProfilePicture
            userId={userId}
            className="profilePicture"
            size="400px"
          />
          <div className="otherUserDetails">
            <p className="otherUserFullName">
              {User.forename}&nbsp;{User.lastName}
            </p>
            <p className="otherUserUsername">
              {User.username}
            </p>
            <p className="otherUserProficiencyLevel">
              {User.proficiencyLevel}
            </p>
            <p className="otherUserAge">
              {User.age}
            </p>
            <p className="otherUserURL">
              {User.url}
            </p>
          </div>
        </div>
          <div className="otherUserBio">
            <p>
          <strong>About me:</strong>
            <br/>
              {User.bio}
            </p>
          </div>
          <div className="languagesAndPreferences">
            <p>
              <strong>Languages and Preferences:</strong> 
                {User.techStack}
                <br/>
              <strong>Looking For:</strong> {User.lookingFor.proficiencyLevel},
                {User.lookingFor.projectType}, {User.lookingFor.techStack}
            </p>
          </div>
          <div className="otherUserProjects">
            <p>
              <strong>Projects:</strong>
              <br/>
              {User.projects}
            </p>
          </div>
=======
      <div>
        <div className="layout">
          <div className="feedpage-wrapper">
            <div className="otherUserContainer">
              <IconButton onClick={handleBack}>
                {" "}
                <ArrowBackIosOutlinedIcon />{" "}
              </IconButton>

              <h2>{User.username}</h2>
              <div>
                <ProfilePicture
                  userId={userId}
                  className="profilePicture"
                  size="400px"
                />
              </div>
              <p>
                <strong>Username:</strong> {User.username}
              </p>
              <p>
                <strong>Email:</strong> {User.email}
              </p>
              <p>
                <strong>Forename:</strong> {User.forename}
              </p>
              <p>
                <strong>Last Name:</strong> {User.lastName}
              </p>
              <p>
                <strong>Proficiency Level:</strong> {User.proficiencyLevel}
              </p>
              <p>
                <strong>Age:</strong> {User.age}
              </p>
              <p>
                <strong>Gender:</strong> {User.gender}
              </p>
              <p>
                <strong>Location:</strong> {User.location}
              </p>

              <p>
                <strong>Projects:</strong> {User.projects}
              </p>

              <p>
                <strong>Tech Stack:</strong> {User.techStack}
              </p>
              <p>
                <strong>Job:</strong> {User.job}
              </p>
              <p>
                <strong>Bio:</strong> {User.bio}
              </p>
              <p>
                <strong>URL:</strong> {User.url}
              </p>

              <p>
                <strong>Looking For:</strong> {User.lookingFor.proficiencyLevel}
                ,{User.lookingFor.projectType}, {User.lookingFor.techStack}
              </p>
            </div>
          </div>
        </div>
>>>>>>> main
      </div>
    </>
  );
};

export default OtherProfilePage;
<<<<<<< HEAD

        {
        /* Below are additional fields we can add. 
        Location, Email, Job and Gender

      <p>
        <strong>Gender:</strong> {User.gender}
      </p>
      <p>
        <strong>Location:</strong> {User.location}
      </p>
      <p>
                <strong>Email:</strong> {User.email}
            </p>

      <p>
        <strong>Job:</strong> {User.job}
      </p> */}
=======
>>>>>>> main
