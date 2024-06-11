import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [forename, setForename] = useState("");
  const [lastName, setLastName] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleForenameChange = (event) => {
    setForename(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleProficiencyLevelChange = (event) => {
    setProficiencyLevel(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          placeholder="Username"
          id="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="Forename"
          id="forename"
          type="forename"
          value={forename}
          onChange={handleForenameChange}
        />
        <input
          placeholder="LastName"
          id="lastName"
          type="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <input
          placeholder="ProficiencyLevel"
          id="proficiencyLevel"
          type="proficiencyLevel"
          value={proficiencyLevel}
          onChange={handleProficiencyLevelChange}
        />
        <input
          placeholder="Age"
          id="age"
          type="age"
          value={age}
          onChange={handleAgeChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
