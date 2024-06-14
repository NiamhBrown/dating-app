import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/authentication";
import "./signup.css";        // General CSS
import "./button.scss";       // SASS file for button styling
import ScrollingText from "./ScrollingText";

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
        <label htmlFor="forename">Forename:</label>
        <input
          placeholder="Forename"
          id="forename"
          type="text"
          value={forename}
          onChange={(e) => setForename(e.target.value)}
        />
        <br/>
        <label htmlFor="lastName">Last Name:</label>
        <input
          placeholder="LastName"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br/>
        <label htmlFor="age">Age:</label>
        <input
          placeholder="Age"
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br/>
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <label htmlFor="proficiencyLevel">Proficiency Level:</label>
        <select
          id="proficiencyLevel"
          value={proficiencyLevel}
          onChange={(e) => setProficiencyLevel(e.target.value)}
        >
          <option value="unspecified">Please select...</option>
          <option value="beginner">Beginner</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
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
        <button className="btn draw-border" role="submit-button" id="submit" type="submit" value="Submit">Submit</button>
      </form>
    </div>
  );
};
