import  LogOutButton from "../../components/LogOutButton";
import  HomeButton  from "../../components/HomeButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUser } from "../../services/user";

const OtherProfilePage = () =>{
    const userId = useParams().userId;    
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [User, setUser] = useState({email:"loading"})

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
        <h2>otheruserProfile</h2>
        <p>{User.forename}</p>
        </>
    )
}

export default OtherProfilePage;















