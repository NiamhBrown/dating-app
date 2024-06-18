import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authentication";
import './Login.css';
import ConsoleText from "./ConsoleText";
import "./loginbutton.scss";
import TextField from '@mui/material/TextField';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  return (
    <>
      <div className="loginpage">
        {/* <h2 role="title" id="logintitle" className="logintitle">Login</h2> */}
        <ConsoleText words={['Console.login', 'touchUsername', 'touchPassword']} colors={['dimgrey']} />
        <form className="formcontainer" onSubmit={handleSubmit}>
          <TextField label="Username" id="username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <TextField label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button className="loginbtn draw-border" role="submit-button" id="submit" type="submit" value="Submit">Submit</button>
          <br />
          <br />
          <br />
          <p className="navtosignup">Don't have an account? Sign up <Link to="/">here.</Link></p>
        </form>
      </div>
    </>
  );
};
