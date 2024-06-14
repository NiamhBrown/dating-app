import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authentication";
import './Login.css';
// import loginimage from "../../backgroundimages/login.jpg";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate("/signup");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseFromLogin = await login(email, password);
      localStorage.setItem("token", responseFromLogin.token);
      localStorage.setItem("userId", responseFromLogin.userId);
      navigate("/home");

    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div >
      {/* style={{ backgroundImage: `url(${background2})`}} */}
      <h2 className="logintitle">Login</h2>
      <form className="formcontainer" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        <br />
        <p>Don't have an account? Sign up <Link onClick={handleNavigateToSignUp}>here.</Link></p>
      </form>
      </div>
    </>
  );
};
