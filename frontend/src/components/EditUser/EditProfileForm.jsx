import Button from "./Button"; 
import { useState } from "react";
import Select from "react-select";
import PictureUpload from "../pictureUpload";
import ProfilePicture from "../ProfilePicture";
import "./editProfileForm.css";


const EditProfileForm = ({ user, onSave, onClose }) => {
  console.log(user);
  const [formData, setFormData] = useState({
    email: user.email || "",
    forename: user.forename || "",
    lastName: user.lastName || "",
    proficiencyLevel: user.proficiencyLevel || "Unspecified",
    age: user.age || "",
    gender: user.gender || "Prefer not to say",
    location: user.location || "",
    experience: user.experience || "",
    languages: user.languages || [],
    technologies: user.technologies || [],
    techStack: user.techStack || [],
    job: user.job || "",
    bio: user.bio || "",
    url: user.url || "",
    lookingFor: user.lookingFor || {
      proficiencyLevel: [],
      techStack: [],
      projectType: [],
    },
    projects: user.projects || [],
  });


  //handles both nested and single input feilds 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...formData.projects];
    newProjects[index][name] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", techStack: [], url: "" }],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    console.log("formdata",formData)
  };

  const handleSelectChange = (selectedOptions, { name }) => {
    setFormData((prev) => {
      if (name.includes(".")) {
        const keys = name.split(".");
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: selectedOptions
              ? selectedOptions.map((option) => option.value)
              : [],
          },
        };
      } else {
        return {
          ...prev,
          [name]: selectedOptions
            ? selectedOptions.map((option) => option.value)
            : [],
        };
      }
    });
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

  const techStackOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Ruby", label: "Ruby" },
    { value: "SQL", label: "SQL" },
  ];
  const proficiencyLevelOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Junior", label: "Junior" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Senior", label: "Senior" },
  ];

  return (
    
    <PictureUpload />

  <div className="scrollable-container">
    <PictureUpload /> // may have to move

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
          <option value="Unspecified">Unspecified</option>
          <option value="Beginner">Beginner</option>
          <option value="Junior">Junior</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Senior">Senior</option>
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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
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
      <label>
        Tech Stack:
        <Select
          name="techStack"
          isMulti
          value={formData.techStack.map((stack) => ({
            value: stack,
            label: stack,
          }))}
          options={techStackOptions}
          onChange={handleSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </label>
      <hr />
      <h4>My projects:</h4>
{formData.projects.map((project, index) => (
  <div key={index}>
    <label>
      Title:
      <input
        type="text"
        name="title"
        value={project.title}
        onChange={(e) => handleProjectChange(index, e)}
      />
    </label>
    <br />
    <label>
      Description:
      <textarea
        name="description"
        value={project.description}
        onChange={(e) => handleProjectChange(index, e)}
      />
    </label>
    <br />
    <label>
      URL:
      <input
        type="text"
        name="url"
        value={project.url}
        onChange={(e) => handleProjectChange(index, e)}
      />
    </label>
    <label>
            Built with:
            <Select
              name="techStack"
              isMulti
              value={project.techStack.map((stack) => ({
                value: stack,
                label: stack,
              }))}
              options={techStackOptions}
              onChange={(selectedOptions) => {
                const newProjects = [...formData.projects];
                newProjects[index].techStack = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setFormData({ ...formData, projects: newProjects });
              }}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </label>
          <button type="button" onClick={() => removeProject(index)}>Remove Project</button>
  </div>
))}
<br/>
      <button type="button" onClick={addProject}>Add Project</button>
      <hr />
      <h4>Looking For:</h4>
      <label>
        Proficiency Level:
        <Select
          name="lookingFor.proficiencyLevel"
          isMulti
          value={formData.lookingFor.proficiencyLevel.map((level) => ({
            value: level,
            label: level,
          }))}
          options={proficiencyLevelOptions}
          onChange={handleSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </label>
      <br />
      <label>
        Tech Stack:
        <Select
          name="lookingFor.techStack"
          isMulti
          value={formData.lookingFor.techStack.map((stack) => ({
            value: stack,
            label: stack,
          }))}
          options={techStackOptions}
          onChange={handleSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </label>
      <br />
      <label>
        Project Type:
        <Select
          name="lookingFor.projectType"
          isMulti
          value={formData.lookingFor.projectType.map((proj) => ({
            value: proj,
            label: proj,
          }))}
          options={projectOptions}
          onChange={handleSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </label>
      <br />

      <br />
      <div className="form-buttons">
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>

    </div>  

  );
};

export default EditProfileForm;
