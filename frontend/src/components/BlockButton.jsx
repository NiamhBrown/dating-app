import { blockUserService } from "../services/user";

const BlockButton = ({ user, otherUser }) => {
  const token = localStorage.getItem("token");

  const blockUser = () => {
    blockUserService(token, user, otherUser).then((data) => {
      console.log("THIS IS THE DATA:", data);
    });
    window.location.reload();
  };

  return (
    <>
      <button onClick={blockUser}>Block</button>
    </>
  );
};

export default BlockButton;
