// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Route, Routes, Router, useLocation, createBrowserRouter, RouterProvider } from "react-router-dom";
// // import { createBrowserRouter, RouterProvider, useLocation, Routes, Route } from 'react-router-dom';
// import "./App.css";
// import { LoginPage } from "./pages/Login/LoginPage";
// import { SignupPage } from "./pages/Signup/SignupPage";
// // import { Container, Header, List } from "semantic-ui-react";
// import HomePage from "./pages/Home/HomePage";
// import ProfilePage from "./pages/Profile/ProfilePage";
// import OtherProfilePage from "./pages/Profile/anotherUserProfile";



// // docs: https://reactrouter.com/en/main/start/overview
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SignupPage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/home",
//     element: <HomePage/>,
//   },
//   {
//   path: "/profile",
//   element: <ProfilePage/>
//   },
//   {
//     path: "/profile/:userId",
//     element: <OtherProfilePage/>
//   },
// ]);

// const BackgroundHandler = ({ children }) => {
//   const [backgroundImage, setbackgroundImage] = useState('url(./backgroundimages/signup.jpg)');
//   const location = useLocation();

//   useEffect(() => {
//     switch(location.pathname) {
//       case '/':
//         setbackgroundImage('url(/backgroundimages/signup.jpg)');
//         break;
//       case '/login':
//         setbackgroundImage('url(/backgroundimages/login.jpg)');
//         break;
//       case '/home':
//         setbackgroundImage('url()');
//         break;
//       case '/profile':
//         setbackgroundImage('url(../../backgroundimages/profile.jpg)');
//         console.log("profile")
//         break;
//       case '/profile/:userId':
//         setbackgroundImage('url(/backgroundimages/profile.jpg)');
//         break;
//       default:
//         setbackgroundImage('url(/backgroundimages/signup.jpg)');
//         break;
//     }
//   }, [location.pathname]);

//   return (
//     <div className='background-container' style={{ backgroundImage: backgroundImage, transition: 'background-image 0.5s ease-in-out' }}>
//       {children}
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <RouterProvider router={router}>
//       <BackgroundHandler/>
//       </RouterProvider>
//       {/* <RouterProvider router={router}> */}
//       {/* <Router> 
//         <BackgroundHandler>
//           <Routes>
//             <Route path="/" element={<SignupPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/home" element={<HomePage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/profile/:userId" element={<OtherProfilePage />} />
//           </Routes>
//         </BackgroundHandler>
//         </Router>  */}
//     {/* </RouterProvider> */}
//     </>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
import {LoginPage} from './pages/Login/LoginPage';
import {SignupPage} from './pages/Signup/SignupPage';
import HomePage from './pages/Home/HomePage';
import ProfilePage from './pages/Profile/ProfilePage';
import OtherProfilePage from './pages/Profile/anotherUserProfile';

// import signupImage from './backgroundimages/signup.jpg';
// import loginImage from './backgroundimages/login.jpg';
// import profileImage from './backgroundimages/profile.jpg';

import BackgroundHandler from './components/BackgroundHandler'

const App = () => {
  return (
    <>
    <Router>
      <BackgroundHandler>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<OtherProfilePage />} />
        </Routes>
      </BackgroundHandler>
    </Router>
    </>
  );
};

export default App;
