
import { useNavigate } from "react-router-dom";
import LogOutButton from "../../components/LogOutButton";
import MyProfileButton from "../../components/MyProfileButton";
import Navbar from "../../components/Navbar";
import Burger from "../../components/Burger";



const HomePage = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (!token){
        navigate("/login")
    }

    return (<>
        <title>Homepage</title>
        <Burger />
        <Navbar />
        <LogOutButton/>
        <MyProfileButton/>
        </>
    );
};

export default HomePage;

