import { useState, useEffect } from 'react';
import Select from 'react-select';
import { updateUserProfile } from '../../services/user';
import { getOneUser } from '../../services/users';
import PictureUpload from '../../components/pictureUpload';
import ProfilePicture from '../../components/ProfilePicture';


const projectOptions = [
    { value: 'App', label: 'App' },
    { value: 'Website', label: 'Website' },
    { value: 'Web app', label: 'Web app' },
    { value: 'Game', label: 'Game' },
    // Add more options as needed
  ];
const EditProfilePage = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        forename: '',
        lastName: '',
        profilePicture: '',
        proficiencyLevel: 'unspecified',
        age: '',
        gender: 'prefer not to say',
        location: '',
        lookingFor: {
          proficiency: 'unspecified',
          techStack: [],
        },
        experience: '',
        projects: [],
        languages: [],
        technologies: [],
        projectType: '',
        techStack: [],
        job: '',
        bio: '',
        url: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const data = await getOneUser(token, userId);
            console.log("data.user", data.user);
            
            // Ensure projects is an array even if it's undefined or null in the fetched data
            data.projects = data.projects || [];
            setFormData(data);
            setLoading(false);
            localStorage.setItem("token", data.token);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        };
    
        fetchUserData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOptions, { name }) => {
        setFormData({ ...formData, [name]: selectedOptions.map(option => option.value) });
    };

    // const handleSelectChange = (selectedOptions) => {
    //     setFormData({ ...formData, projects: selectedOptions ? selectedOptions.map(option => option.value) : [] });
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const updatedUser = await updateUserProfile(formData, token);
        console.log('User profile updated successfully:', updatedUser);
        setSuccess("User profile updated successfully.")
        
        } catch (error) {
        setError(error.message);
        console.error('Error updating profile:', error);
        }
    };
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }



    return <>
    <h2>Edit profile page</h2>
    <ProfilePicture userId={userId}/>
    <PictureUpload/>

    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
    <input
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
        placeholder={formData.user.username ? formData.user.username : "Username"}
    />
    <br/>
    <label htmlFor="email">Email:</label>
    <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={formData.user.email ? formData.user.email : "Email"}
    />
    <br/>
    <label htmlFor="forename">Forename:</label>
    <input
        type="text"
        name="forename"
        id="forename"
        value={formData.forename}
        onChange={handleChange}
        placeholder={formData.user.forename ? formData.user.forename : "Forename"}
    />
    <br/>
    <label htmlFor="lastName">Last Name:</label>
    <input
        type="text"
        name="lastName"
        id="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder={formData.user.lastName ? formData.user.lastName : "Last name"}
    />
    <br/>
    <label htmlFor="proficiencyLevel">Proficiency Level:</label>
    <select
        name="proficiencyLevel"
        id="proficiencyLevel"
        value={formData.proficiencyLevel}
        onChange={handleChange}
    >
        <option value="unspecified">Please select..</option>
        <option value="beginner">Beginner</option>
        <option value="junior">Junior</option>
        <option value="intermediate">Intermediate</option>
        <option value="senior">Senior</option>
    </select>
    <br/>
    <label htmlFor="age">Age:</label>
    <input
        type="number"
        name="age"
        id="age"
        value={formData.age}
        onChange={handleChange}
        placeholder={formData.user.age ? formData.user.age : "Age"}
      />
      <br/>
      <label htmlFor="gender">Gender:</label>
      <select
        name="gender"
        id="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="prefer not to say">Prefer not to say</option>
      </select>
      <br/>
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder={formData.user.location ? formData.user.location : "Location"}
      />
      <br/>
      <label htmlFor="bio">Bio:</label>
      <textarea
        type="text"
        name="bio"
        id="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder={formData.user.bio}
    />
    <br/>
    <label htmlFor="url">URL:</label>
    <input
        type="text"
        name="url"
        id="url"
        value={formData.url}
        onChange={handleChange}
        placeholder={formData.user.url ? formData.user.url : "URL"}
      />
      <br/>
      <label htmlFor="projects">Projects:</label>
      <Select
        isMulti
        name="projects"
        id="projects"
        options={projectOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        value={projectOptions.filter(option => formData.projects.includes(option.value))}
        onChange={handleSelectChange}
      />


<button type="submit">Update Profile</button>
{error && <p style={{ color: 'red' }}>{error}</p>}
{success && <p style={{ color: 'green' }}>{success}</p>}

    </form>
    </>
}

export default EditProfilePage