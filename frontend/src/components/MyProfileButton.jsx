import { useNavigate } from "react-router-dom";
const MyProfileButton = () => {
    const navigate = useNavigate();

    const handleMyProfileButton = () => {
        navigate('/profile');
    };
    return (
        <>
        <button name="my-profile-button" id="my-profile-button" onClick={handleMyProfileButton}>My Profile</button>
        </>
    );
};

export default MyProfileButton;