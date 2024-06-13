import Select from "react-select";
const techStackOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Angular", label: "Angular" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Django", label: "Django" },
  { value: "Flask", label: "Flask" },
  { value: "Spring", label: "Spring" },
  // Add more options as needed
];
const EditTechStack = ({ techStack, setTechStack }) => {
  const handleTechStackChange = (selectedOptions) => {
    // Update the tech stack state with new values
    setTechStack(selectedOptions.map((option) => option.value));
  };

  return (
    <div>
      <label>Edit Tech Stack</label>

      <Select
        isMulti
        name="techStack"
        options={techStackOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        value={techStackOptions.filter((option) =>
          techStack.includes(option.value)
        )}
        onChange={handleTechStackChange}
      />
    </div>
  );
};

export default EditTechStack;
