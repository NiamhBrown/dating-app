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

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
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
  });
  const [showModal, setShowModal] = useState(false);

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
  }, [navigate]);

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

  return (
    <>
      {/* <hr /> */}
      <div className="burgercontainer">
        <Burger />
      </div>
      <div className="profilecontainer">
        <ProfilePicture userId={userId} className="profilePicture" />
        {/* <img src={profileImageUrl}></img> */}
        <PictureUpload />
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
          <strong>Experience:</strong> {User.experience}
        </p>
        <p>
          <strong>Projects:</strong> {User.projects.join(", ")}
        </p>
        <p>
          <strong>Languages:</strong> {User.languages.join(", ")}
        </p>
        <p>
          <strong>Technologies:</strong> {User.technologies.join(", ")}
        </p>
        <p>
          <strong>Tech Stack:</strong> {User.techStack.join(", ")}
        </p>
        <p>
          <strong>Job:</strong> {User.job}
        </p>
        <p>
          <strong>Bio:</strong> {User.bio}
        </p>
        <p>
          <strong>URL:</strong>{" "}
        </p>

        <div>
          <button onClick={() => setShowModal(true)}>Edit profile</button>
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <h2>Edit Profile</h2>

            <EditProfileForm
              user={User}
              onSave={handleSave}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
