import { sendMatchRequest, acceptMatch } from "../../services/user";

const User = (props) => {

    const incriment = props.methods[0];
    const decriment = props.methods[1];
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
            <article key={props.user._id}>
                {props.user.username} <br />
                {props.user.forename + " " + props.user.lastName + ", " + props.user.age}<br />
                {"Skill level: " + props.user.proficiencyLevel} <br />
                <button onClick={incriment}>Show Next</button>
                <button onClick={sendRequest}>Add User</button>
                <button onClick={decriment}>Go back</button>
            </article>
        </>
    );
  };
  
  export default User;