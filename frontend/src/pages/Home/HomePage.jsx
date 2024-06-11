
import { useNavigate } from "react-router-dom";

import LogOutButton from "../../components/LogOutButton";
import MyProfileButton from "../../components/MyProfileButton";


const HomePage = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (!token){
        navigate("/login")
    }

    return (<>
        <title>Homepage</title>
        <LogOutButton/>
        <MyProfileButton/>
        </>
    );
};

export default HomePage;

