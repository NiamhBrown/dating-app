import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const BackgroundHandler = ({ children }) => {
      const [backgroundImage, setbackgroundImage] = useState('url(./backgroundimages/signup.jpg)');
      const location = useLocation();
    
      useEffect(() => {
        switch(location.pathname) {
          case '/':
            setbackgroundImage('url(/backgroundimages/signup.jpg)');
            break;
          case '/login':
            setbackgroundImage('url(/backgroundimages/login.jpg)');
            break;
          case '/home':
            setbackgroundImage('url()');
            break;
          case '/profile':
            setbackgroundImage('url(../../backgroundimages/profile.jpg)');
            console.log("profile")
            break;
          case '/profile/:userId':
            setbackgroundImage('url(/backgroundimages/profile.jpg)');
            break;
          default:
            setbackgroundImage('url(/backgroundimages/signup.jpg)');
            break;
        }
      }, [location.pathname]);
      return (
            <div className='background-container' style={{ backgroundImage: backgroundImage, transition: 'background-image 0.5s ease-in-out' }}>
              {children}
            </div>
          );
        };

export default BackgroundHandler;