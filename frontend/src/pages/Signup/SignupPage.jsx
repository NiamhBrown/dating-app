import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/authentication";
import "./signup.css";        // General CSS
import "./signupbutton.scss";       // SASS file for button styling
import ScrollingText from "./ScrollingText";
import MenuItem from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import Select from "./test";


export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [forename, setForename] = useState("");
  const [lastName, setLastName] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: [
      "Password must be at least 8 characters.",
      "Password must have at least one capital letter.",
      "Password must contain a special character.",
    ],
  });

  useEffect(() => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const validatePassword = () => {
      let updatedErrors = [
        "Password must be at least 8 characters.",
        "Password must have at least one capital letter.",
        "Password must contain a special character.",
      ];

      if (password.length >= 8) {
        updatedErrors = updatedErrors.filter(
          (error) => error !== "Password must be at least 8 characters."
        );
      }
      if (capitalLetterRegex.test(password)) {
        updatedErrors = updatedErrors.filter(
          (error) => error !== "Password must have at least one capital letter."
        );
      }
      if (specialCharacterRegex.test(password)) {
        updatedErrors = updatedErrors.filter(
          (error) => error !== "Password must contain a special character."
        );
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: updatedErrors,
      }));
    };

    validatePassword();
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: "",
      email: "",
    }));
    try {
      await signup(
        email,
        password,
        username,
        forename,
        lastName,
        proficiencyLevel,
        age
      );
      navigate("/login");
    } catch (err) {
      if (err.message === "Username already exists.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: err.message,
        }));
      } else if (err.message === "Email already exists.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: err.message,
        }));
      }
    }
  };

  return (
    <div>
      <ScrollingText />
      <form className="signupformcontainer" onSubmit={handleSubmit}>
        <p>Already have an account? Sign in <Link to="/login">here!</Link></p>
       <div className="br"/>
       <TextField id="foreName"
       label="Forename"
       variant="outlined"
       color="primary"
       value={forename}
       onChange={(e) => setForename(e.target.value)}
       />
        <br/>
        <TextField id="lastName"
       label="Last Name"
       variant="outlined"
       color="primary"
       value={lastName}
       onChange={(e) => setLastName(e.target.value)}
       />
        <br/>
        <TextField id="Age"
       label="Age"
       variant="outlined"
       type="number"
       color="primary"
       value={age}
       onChange={(e) => setAge(e.target.value)}
       />
        <br/>
        <TextField id="Username"
       label="Username"
       variant="outlined"
       color="primary"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       />
        <br/>
        <TextField id="Password"
       label="Password"
       variant="outlined"
       color="primary"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       />
        <br/>
        <Select/>
        <br/>
        {errors.password.length > 0 && (
          <ul>
            {errors.password.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {errors.username && <p id="usernameError">{errors.username}</p>}
        {errors.email && <p>{errors.email}</p>}
        <button className="signupbtn draw-border" role="submit-button" id="submit" type="submit" value="Submit">Submit</button>
      </form>
    </div>
  );
};
