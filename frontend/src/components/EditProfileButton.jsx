import { useNavigate } from "react-router-dom";
const EditProfileButton = () => {
    const navigate = useNavigate();

    const handleProfileButton = () => {
        navigate('/profile/edit');
    };
    return (
        <>
        <button name="edit-profile-button" id="edit-profile-button" onClick={handleProfileButton}>Edit profile</button>
        </>
    );
};

export default EditProfileButton;