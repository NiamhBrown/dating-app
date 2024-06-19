import defaultProfilePic from "../assets/defaultProfilePic.png";
const ProfilePicture = ({ userId, size, className }) => {
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
        height={size}
        className={className}
      ></img>
    </>
  );
};

export default ProfilePicture;
