import  LogOutButton from "../../components/LogOutButton";
import  HomeButton  from "../../components/HomeButton";
import PictureUpload from "../../components/pictureUpload";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/user";
import { useNavigate, useParams } from "react-router-dom";


const ProfilePage = () =>{
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [User, setUser] = useState({email:"loading"});

    useEffect(() => { 
            const fetchUserData = async () => {
                console.log("fetchdata")
                console.log("userid",userId)
                try {
                    const data = await getOneUser(token,userId);
                    console.log("data.user",data.user)
                    setUser(data.user);
                    localStorage.setItem("token", data.token); 
                } catch (err) {
                    console.error(err);
                    navigate("/login");
                }
            };
    
            fetchUserData();
        }, [userId, navigate]);









    return(
        <>
        <HomeButton/>
        <LogOutButton/>
        <PictureUpload/>
        <p>{User.email}</p>
        <p>{User.forename}</p>
        <p>{User.lastName}</p>

        </>
    );
};








export default ProfilePage;