import { useState, useEffect } from 'react';
import { updateUserProfile } from '../../services/user';
import { getOneUser } from '../../services/users';


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
        console.log("fetchdata");
        console.log("userid", userId);
        try {
            const data = await getOneUser(token, userId);
            console.log("data.user", data.user);
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
        console.log("THIS IS FORM DATA:", formData)
    };

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

    <form onSubmit={handleSubmit}>
    <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder={formData.user.username}
    />
    <br/>
    <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={formData.user.email}
    />
    <br/>

<button type="submit">Update Profile</button>
{error && <p style={{ color: 'red' }}>{error}</p>}
{success && <p style={{ color: 'green' }}>{success}</p>}

    </form>
    </>
}

export default EditProfilePage