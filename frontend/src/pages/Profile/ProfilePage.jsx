import "./profile.css";
import PictureUpload from "../../components/pictureUpload";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/user";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../components/ProfilePicture";
import Burger from "../../components/Burger";
import Modal from "../../components/EditUser/Modal";
import { updateUserProfile } from "../../services/user";
import EditProfileForm from "../../components/EditUser/EditProfileForm";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import IconButton from "@mui/material/IconButton";
import defaultProfilePic from "./../../assets/defaultProfilePic.png"
import "./buttons.css";

const ProfilePage = ({setMyProfile}) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const serverUrl = `http://localhost:3000/uploads/${userId}`;
  const [pictureUpdate, setPictureUpdate] = useState(false)
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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getOneUser(token, userId);
        setUser(data.user);
        console.log(data.user.profilePicture)
        localStorage.setItem("token", data.token);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [User.profilePicture]);

  const handleSave = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const updatedUser = await updateUserProfile(updatedData, token);
      setUser(updatedUser);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const handleUpload = () =>{
    setUser()
  };
  
  
  const handleBack = () => {
    setMyProfile(false)
  };

  return (
    <>


      <div className="profilecontainer">

      <IconButton onClick={handleBack}>
            {" "}
            <ArrowBackIosOutlinedIcon />{" "}
          </IconButton>
          
        <div className="profilepicturecontainer">
          {!User.profilePicture && <img src={defaultProfilePic} width="250px"/>}
          {User.profilePicture && <img className="userProfilepicture" 
          src={`http://localhost:3000${User.profilePicture}?${new Date().getTime()}`} 
          width="300px" />}
        </div>
        <div className="profilebasicscontainer">
          <p>
              {User.forename} {User.lastName}, {User.age}  {User.location}
          </p>
          </div>

        <div className="profileBioAndProficiencyLevel">
          <p>
            <h6>About Me:</h6> {User.bio}
          </p>
          <p>
            <h6>Proficiency Level:</h6> {User.proficiencyLevel}
          </p>
        </div>




        <div className="projects">
  <h6>My projects:</h6> 
  {User.projects.map((project, index) => (
    <div key={index} className="project">
      <p><strong>Title:</strong> {project.title}</p>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>URL:</strong> <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>
      <p><strong>Tech Stack:</strong> {project.techStack}</p>
    </div>
  ))}
</div>
        <div className="profileLookingForAndPortfolio">
        <p>
          <h6>What I'm looking for:</h6> 
          {User.lookingFor.projectType}
          <br/>
          {User.lookingFor.proficiencyLevel}
          <br/>
          {User.lookingFor.techStack}
        </p>
        <br/>
       <h6>My Portfolio:</h6>
        <p>
          <strong>Tech Stack:</strong> {User.techStack.join(", ")}
          <br/>
          <strong>URL:</strong> <a href="{User.url}">{User.url}</a>
        </p>
        </div>
        <div className="editprofilecontainer">
          <button className="comic-button" onClick={() => setShowModal(true)}>Edit profile</button>
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <h2>Edit Profile</h2>

            <EditProfileForm
              user={User}
              onSave={handleSave}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>

        {/* <div>
          <button onClick={() => setShowModal(true)}>Edit profile</button>
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <h2>Edit Profile</h2>

            <EditProfileForm
              user={User}
              onSave={handleSave}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div> */}
      </div>
    </>
  );
};

export default ProfilePage;
