import LogOutButton from "../../components/LogOutButton";
import HomeButton from "../../components/HomeButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUser } from "../../services/user";
import ProfilePicture from "../../components/ProfilePicture";
import "./anotherUserProfile.css";

const OtherProfilePage = () => {
  const userId = useParams().userId;
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

  return (
    <>
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
      </div>
    </>
  );
};

export default OtherProfilePage;

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
