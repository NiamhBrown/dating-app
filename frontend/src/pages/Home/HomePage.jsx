import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { UserChat } from "../Profile/UserChat";
import Burger from "../../components/Burger";
import { Container } from "rsuite";
import FeedPage from "../Feed/FeedPage";
import { useState } from "react";
import OtherProfilePage from "../Profile/anotherUserProfile";

const HomePage = () => {
  const navigate = useNavigate();
  const [chatting, setChatting] = useState(false);
  const [checkProfile, setCheckProfile] = useState(false);
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
          <Burger className="burgerhome" />
        </Container>
        <div className="feedpage-wrapper">
          <div className="feedpagecontainer">
            {!chatting && <FeedPage />}
            {chatting && !checkProfile && (
              <UserChat
                setChatting={setChatting}
                chatterId={chatterId}
                setCheckProfile={setCheckProfile}
              />
            )}
            {checkProfile && (
              <OtherProfilePage
                setCheckProfile={setCheckProfile}
                userId={chatterId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
