import './HomePage.css';
import { useNavigate } from "react-router-dom";
import LogOutButton from "../../components/LogOutButton";
import MyProfileButton from "../../components/MyProfileButton";
import Navbar from "../../components/Navbar";
import Burger from "../../components/Burger";
import { Container } from "rsuite";
import FeedPage from '../Feed/FeedPage';



const HomePage = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (!token){
        navigate("/login")
    }

    return (
        <>
        <Container className="container">
            <Navbar className="navbarhome"/>
            <div className='maincontent'>
                <FeedPage />
            </div>
            <Burger className="burgerhome"/>
        </Container>
        </>
    );
};

export default HomePage;

