import { useNavigate } from "react-router-dom";
const LogOutButton =() =>{
    const navigate = useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        navigate('/login')
    };


    return (
        <>
        <button name = "logout-button"onClick={handleLogout} id="logout-button">
                    Log out 
                </button>
        </>
    )
};
export default LogOutButton;