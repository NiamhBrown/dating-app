import LogOutButton from "../../components/LogOutButton";
import HomeButton from "../../components/HomeButton";
import PictureUpload from "../../components/pictureUpload";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/users";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePicture from "../../components/ProfilePicture";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [User, setUser] = useState({ email: "loading" });
  const serverUrl = "http://localhost:3000";
  const profileImageUrl = `${serverUrl}/uploads/${userId}`;

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
  }, [userId, navigate]);

  return (
    <>
      <HomeButton />
      <LogOutButton />
      <hr />
      <ProfilePicture userId={userId} />
      {/* <img src={profileImageUrl}></img> */}
      <PictureUpload />
      <p>{User.email}</p>
      <p>{User.forename}</p>
      <p>{User.lastName}</p>
    </>
  );
};

export default ProfilePage;
