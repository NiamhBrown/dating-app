import defaultProfilePic from "../assets/defaultProfilePic.png";
const ProfilePicture = ({ userId }) => {
  const serverUrl = "http://localhost:3000";
  const profileImageUrl = `${serverUrl}/uploads/${userId}`;
  const handleError = (event) => {
    event.target.src = defaultProfilePic;
  };
  return (
    <>
      <img  src={profileImageUrl} onError={handleError} width="400px"></img>
    </>
  );
};

export default ProfilePicture;
