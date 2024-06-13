import { useState } from "react";
import { uploadProfilePicture } from "../services/users";

const PictureUpload = () => {
  const token = localStorage.getItem("token");
//   console.log("THIS IS TOKEN!!:", token);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const data = await uploadProfilePicture(token, profilePicture);
      console.log("Profile picture uploaded:", data);
      setIsFormVisible(false);
    } catch (err) {
      console("Error uploading profile picture:", err);
    }
    window.location.reload();
  };

  return (
    <div>
      <button
        className="primary-button"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Cancel" : "Update Picture"}
      </button>
      {isFormVisible && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default PictureUpload;
