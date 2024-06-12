import LogOutButton from "../../components/LogOutButton";
import HomeButton from "../../components/HomeButton";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/users";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../components/ProfilePicture";
import EditProfileButton from "../../components/EditProfileButton";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [User, setUser] = useState({ email: "loading" });


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
      <EditProfileButton />
      <ProfilePicture userId={userId} />

      <p>{User.email}</p>
      <p>{User.forename}</p>
      <p>{User.lastName}</p>
    </>
  );
};

export default ProfilePage;
