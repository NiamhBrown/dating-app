import Button from "./Button"; // Import the Button component
import { useState } from "react";
import Select from "react-select";

const EditProfileForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    email: user.email || "",
    forename: user.forename || "",
    lastName: user.lastName || "",
    proficiencyLevel: user.proficiencyLevel || "unspecified",
    age: user.age || "",
    gender: user.gender || "prefer not to say",
    location: user.location || "",
    experience: user.experience || "",
    projects: user.projects || [],
    languages: user.languages || [],
    technologies: user.technologies || [],
    techStack: user.techStack || [],
    job: user.job || "",
    bio: user.bio || "",
    url: user.url || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (selectedOptions, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const projectOptions = [
    { value: "App", label: "App" },
    { value: "Website", label: "Website" },
    { value: "Web app", label: "Web app" },
    { value: "Game", label: "Game" },
    // Add more options as needed
  ];

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Forename:
        <input
          type="text"
          name="forename"
          value={formData.forename}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>

      <br />
      <label>
        Proficiency Level:
        <select
          name="proficiencyLevel"
          value={formData.proficiencyLevel}
          onChange={handleChange}
          required
        >
          <option value="unspecified">Unspecified</option>
          <option value="beginner">Beginner</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Experience:
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Projects:
        <Select
          name="projects"
          isMulti
          value={formData.projects.map((proj) => ({
            value: proj,
            label: proj,
          }))}
          options={projectOptions}
          onChange={handleSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        {/* <input
          type="text"
          name="projects"
          value={formData.projects.join(", ")}
          onChange={handleArrayChange} */}
        {/* /> */}
      </label>
      <br />
      <label>
        Languages (comma-separated):
        <input
          type="text"
          name="languages"
          value={formData.languages.join(", ")}
          onChange={handleArrayChange}
        />
      </label>
      <br />
      <label>
        Technologies (comma-separated):
        <input
          type="text"
          name="technologies"
          value={formData.technologies.join(", ")}
          onChange={handleArrayChange}
        />
      </label>

      <br />
      <label>
        Tech Stack (comma-separated):
        <input
          type="text"
          name="techStack"
          value={formData.techStack.join(", ")}
          onChange={handleArrayChange}
        />
      </label>
      <br />
      <label>
        Job:
        <input
          type="text"
          name="job"
          value={formData.job}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Bio:
        <textarea name="bio" value={formData.bio} onChange={handleChange} />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </label>
      <br />
      <div className="form-buttons">
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
