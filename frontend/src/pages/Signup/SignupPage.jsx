import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/authentication";
import "./signup.css";        // General CSS
import "./signupbutton.scss"; // SASS file for button styling
import ScrollingText from "./ScrollingText";
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Unspecified',
  'Beginner',
  'Junior',
  'Intermediate',
  'Senior',
];

function getStyles(name, selectedName, theme) {
  return {
    fontWeight:
      selectedName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [forename, setForename] = useState("");
  const [lastName, setLastName] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [age, setAge] = useState("");
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
          size="small"
          label="Forename"
          variant="outlined"
          color="primary"
          value={forename}
          onChange={(e) => setForename(e.target.value)}
        />
        <br/>
        <TextField id="lastName"
          size="small"
          label="Last Name"
          variant="outlined"
          color="primary"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br/>
        <TextField id="Age"
          size="small"
          label="Age"
          variant="outlined"
          type="number"
          color="primary"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br/>
        <TextField id="Username"
          size="small"
          label="Username"
          variant="outlined"
          color="primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <TextField id="Email"
          size="small"
          label="Email"
          variant="outlined"
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <TextField id="Password"
          size="small"
          label="Password"
          variant="outlined"
          color="primary"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="proficiency-level-label">Proficiency Level</InputLabel>
          <Select
            size="small"
            labelId="proficiency-level-label"
            id="proficiency-level"
            value={proficiencyLevel}
            onChange={(e) => setProficiencyLevel(e.target.value)}
            input={<OutlinedInput label="Proficiency Level" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, proficiencyLevel, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
