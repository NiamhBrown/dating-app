import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
// import { Container, Header, List } from "semantic-ui-react";
import { FeedPage } from "./pages/Feed/FeedPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OtherProfilePage from "./pages/Profile/anotherUserProfile";
import EditProfilePage from "./pages/Profile/EditProfilePage";
// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:userId",
    element: <OtherProfilePage />,
  },
  {
    path: "/profile/edit",
    element: <EditProfilePage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
