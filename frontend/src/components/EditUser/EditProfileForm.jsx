import Button from "./Button"; // Import the Button component
import { useState } from "react";
import Select from "react-select";


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
    // projects: user.projects || {
    //   title: "",
    //   description: "",
    //   // techStack:[],
    //   url: "",
    // },
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };


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
  };

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


  // const handleSelectChange = (selectedOptions, { name }) => {
  //   setFormData((prev) => {
  //     if (name.startsWith("lookingFor.")) {
  //       // Extract the specific key for 'lookingFor' nested structure
  //       const key = name.split(".")[1];
  //       return {
  //         ...prev,
  //         lookingFor: {
  //           ...prev.lookingFor,
  //           [key]: selectedOptions
  //             ? selectedOptions.map((option) => option.value)
  //             : [],
  //         },
  //       };
  //     }
  //     return {
  //       ...prev,
  //       [name]: selectedOptions
  //         ? selectedOptions.map((option) => option.value)
  //         : [],
  //     };
  //   });
  // };

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
    { value: "beginner", label: "beginner" },
    { value: "junior", label: "junior" },
    { value: "intermediate", label: "intermediate" },
    { value: "senior", label: "senior" },
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
      {/* <br /> */}
      {/* <label>
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
      </label> */}

      {/* <br /> */}
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
      {/* <hr /> */}
      {/* <h4>My projects:</h4>
      <label>
        Title:
        <input
          type="text"
          name="projects.title"
          value={formData.projects.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea name="projects.description" value={formData.projects.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          name="projects.url"
          value={formData.projects.url}
          onChange={handleChange}
          placeholder="Link to your project/project repo"
        />
        <br />
      </label> */}
      {/* <label>
        Built with:
        <Select
          name="projects.techStack"
          isMulti
          value={formData.projects.techStack.map((stack) => ({
            value: stack,
            label: stack,
          }))}
          options={techStackOptions}
          onChange={handleSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </label> */}

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
          <button type="button" onClick={() => removeProject(index)}>Remove Project</button>
          {/* <hr /> */}
  </div>
))}
      <button type="button" onClick={addProject}>Add Project</button>
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
