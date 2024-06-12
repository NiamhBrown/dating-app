import PictureUpload from "../../components/pictureUpload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";






export const EditProfilePage  = () => {
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
      //test method of a regular expression checks if there's at least one match of the pattern in the argument given
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

    validatePassword(); //call function explicitly to execute
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
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      if (err.message === "Username already exists") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: err.message,
        }));
      } else if (err.message === "Email already exists") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: err.message,
        }));
      }
      console.error(err);
      console.log("signup page error: ", err.message);
      navigate("/");

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
      <PictureUpload />
      <form onSubmit={handleSubmit}>
        <label htmlFor="forename">Forename:</label>
        <input
          placeholder="Forename"
          id="forename"
          type="forename"
          value={forename}
          onChange={handleForenameChange}
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          placeholder="LastName"
          id="lastName"
          type="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <br />
        <label htmlFor="age">Age:</label>
        <input
          placeholder="Age"
          id="age"
          type="age"
          value={age}
          onChange={handleAgeChange}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          id="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />

        <br />
        <label htmlFor="proficiencyLevel">Proficiency Level:</label>
        <select
          placeholder="ProficiencyLevel"
          id="proficiencyLevel"
          type="proficiencyLevel"
          value={proficiencyLevel}
          onChange={handleProficiencyLevelChange}
        >
          <option value="unspecified">Please select....</option>
          <option value="beginner">Beginner</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>

        <br />

        {errors.password.length > 0 && (
          <ul>
            {errors.password.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {errors.username && <p id="usernameError">{errors.username}</p>}
        {errors.email.length > 0 && <p>{errors.email}</p>}
        <br />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default EditProfilePage;