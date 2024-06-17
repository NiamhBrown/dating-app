import defaultProfilePic from "../assets/defaultProfilePic.png";
const ProfilePicture = ({ userId, size }) => {
  const serverUrl = "http://localhost:3000";
  const profileImageUrl = `${serverUrl}/uploads/${userId}`;

  const handleError = (event) => {
    event.target.src = defaultProfilePic;
  };
  return (
    <>
      <img
        src={profileImageUrl}
        alt="User's profile pic"
        onError={handleError}
        width={size}
      ></img>
    </>
  );
};

export default ProfilePicture;
