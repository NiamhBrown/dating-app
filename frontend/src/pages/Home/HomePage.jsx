import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { UserChat } from "../Profile/UserChat";
import Burger from "../../components/Burger";
import { Container } from "rsuite";
import FeedPage from "../Feed/FeedPage";
import { useState } from "react";
import OtherProfilePage from "../Profile/anotherUserProfile";
import ProfilePage from "../Profile/ProfilePage";


const HomePage = () => {
  const navigate = useNavigate();
  const [chatting, setChatting] = useState(false);
  const [checkProfile, setCheckProfile] = useState(false);
  const [myProfile, setMyProfile] = useState(false)
  const [chatterId, setChatterId] = useState("");
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  return (
    <>
      <div className="layout">
        <Container className="container">
          <Navbar
            className="navbarhome"
            setChatting={setChatting}
            setChatterId={setChatterId}
          />
          <div className="maincontent" />
          <Burger className="burgerhome" setMyProfile={setMyProfile}/>
        </Container>
        <div className="feedpage-wrapper">
          <div className="feedpagecontainer">
            {!chatting && !myProfile && <FeedPage />}
            {chatting && !checkProfile && !myProfile && (
              <div className="chatcontainer">
              <UserChat
                setChatting={setChatting}
                chatterId={chatterId}
                setCheckProfile={setCheckProfile}
              />
              </div>
            )}
            {checkProfile && !myProfile &&(
              <OtherProfilePage
                setCheckProfile={setCheckProfile}
                userId={chatterId}
              />
            )}
            {myProfile && (
              <div className="profile-container">
              <ProfilePage
                setMyProfile={setMyProfile}
                // userId={chatterId}
              />
              </div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
