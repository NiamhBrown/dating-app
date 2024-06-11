

import LogOutButton from "../../components/LogOutButton";
import MyProfileButton from "../../components/MyProfileButton";


const HomePage = () => {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    return (<>
        <title>Homepage</title>
        <LogOutButton/>
        <MyProfileButton/>
        </>
    );
};

export default HomePage;

