import { useNavigate } from "react-router-dom";
const HomeButton = () => {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/home');
    };
    return (
        <>
        <button name="home-button" id="home-button" onClick={handleHomeButton}>Home</button>
        </>
    );
};

export default HomeButton;