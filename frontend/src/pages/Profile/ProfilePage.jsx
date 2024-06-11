import  LogOutButton from "../../components/LogOutButton";
import  HomeButton  from "../../components/HomeButton";
import { useEffect, useState } from "react";
import { getOneUser } from "../../services/users";

const ProfilePage = () =>{
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const [User, setUser] = useState(null);

    // useEffect({            
    //     getOneUser(userId)
    //         .then((data)=>{
    //             setUser(data.user)
    //             localStorage.setItem(data.token)})
    //             .catch((err) => {
    //                 console.error(err);
    //                 navigate("/login");
    //             })

        

    // },[])









    return(
        <>
        <HomeButton/>
        <LogOutButton/>
        <p>please render</p>
        </>
    );
};








export default ProfilePage;