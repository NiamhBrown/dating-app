import { removeMatch } from "../services/user";
const token = localStorage.getItem("token")

const UnmatchButton = ({user, otherUser}) => {

    const unmatchUser = () => {
        removeMatch(token, user, otherUser).then((data) => {
            console.log(data);
            // console.log("unmatch successful");
        });
    }

    return <>
    <button onClick={unmatchUser}>Unmatch</button>
    </>

}

export default UnmatchButton