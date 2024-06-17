import { removeMatch } from "../services/user";
const token = localStorage.getItem("token")


const UnmatchButton = ({user, otherUser}) => {

    const unmatchUser = () => {
        removeMatch(token, user, otherUser).then((data) => {
            console.log(data);
        });
        window.location.reload()
    }

    return <>
    <button onClick={unmatchUser}>Unmatch</button>
    </>

}

export default UnmatchButton