import { sendMatchRequest } from "../../services/user";

const User = (props) => {

    const sendRequest = () => {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        console.log(props)
        sendMatchRequest(token, user_id, props.user._id);
    };

    const incriment = () => {
        props.setPos(props.position + 1);
    };

    const decriment = () => {
        props.setPos(props.position - 1);
    };

    return (
        <>
            <article key={props.user._id}>
                {props.user.username} <br />
                {props.user.forename + " " + props.user.lastName + ", " + props.user.age}<br />
                {"Skill level: " + props.user.proficiencyLevel} <br />
                <button onClick={incriment}>Decline</button>
                <button onClick={sendRequest}>Accept</button>
                <button onClick={decriment}>Go back</button>
            </article>
        </>
    );
  };
  
  export default User;