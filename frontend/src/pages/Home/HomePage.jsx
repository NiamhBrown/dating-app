
import { useNavigate } from "react-router-dom";
import LogOutButton from "../../components/LogOutButton";
import MyProfileButton from "../../components/MyProfileButton";
import Navbar from "../../components/Navbar";
import FeedPage from "../Feed/FeedPage";
import { UserChat } from "../Profile/UserChat";



const HomePage = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (!token){
        navigate("/login")
    }

    return (<>
        <title>Homepage</title>
        <Navbar />
        <LogOutButton/>
        <MyProfileButton/>
        <FeedPage />
        {/* <UserChat /> */}
        </>
    );
};

export default HomePage;

