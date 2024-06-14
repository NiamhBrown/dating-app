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
        <div className="layout">
            <Container className="container">
                <Navbar className="navbarhome" />
                <div className='maincontent' />
                <Burger className="burgerhome" />
            </Container>
            <div className="feedpage-wrapper">
                <div className='feedpagecontainer'>
                    <FeedPage />
                </div>
            </div>
        </div>
        </>
    );
};

export default HomePage;

