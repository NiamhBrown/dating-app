import { sendMatchRequest, acceptMatch } from "../../services/user";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import TurnLeftOutlinedIcon from "@mui/icons-material/TurnLeftOutlined";
import ProfilePicture from "../ProfilePicture";
import "./user.css";
// moham
import "./buttonanimations.scss";

const User = (props) => {
  const incriment = props.methods[0];
  const decriment = props.methods[1];
  const handleMatchOrBlock = props.methods[2];
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const sendRequest = () => {
    // add error handling

    if (props.requests.includes(props.user._id)) {
      acceptMatch(token, userId, props.user._id);
    } else {
      sendMatchRequest(token, userId, props.user._id);
    }
    incriment();
  };

  return (
    <>

      <div className="usercard" key={props.user._id}>
        <div className="pictureOnCard">
          {" "}
          <ProfilePicture
            userId={props.user._id}
            className="picturePic"
            size="200px"
          />
        </div>


        <h3 className="name_and_age">
          {props.user.forename} {props.user.lastName}, {props.user.age}
        </h3>
        <h4 className="skill_level">
          Skill Level: {props.user.proficiencyLevel}
        </h4>

        <div className="iconButton_container">
          <IconButton
            className="iconButton iconButtonAnimate iconButtonda3e3e"
            onClick={() => {
              console.log("THIS IS PROPS.USER:",props.user)
              console.log("THIS IS incriment():",incriment)
              incriment();
              handleMatchOrBlock();
            }}
          >
            <DoDisturbOutlinedIcon style={{ fontSize: 50, color: "#da3e3e" }} />
          </IconButton>
          {/* <IconButton
            className="iconButton iconButtonAnimate iconButtonDodgerBlue"
            onClick={decriment()}
          >
            <TurnLeftOutlinedIcon
              style={{ fontSize: 64, color: "dodgerblue" }}
            />
          </IconButton> */}
          <IconButton
            className="iconButton iconButtonAnimate iconButtonGold"
            onClick={() => {
              sendRequest();
              handleMatchOrBlock();
            }}
          >
            <StarOutlineOutlinedIcon style={{ fontSize: 60, color: "gold" }} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default User;

