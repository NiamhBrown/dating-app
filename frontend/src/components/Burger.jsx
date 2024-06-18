import * as React from 'react';
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import "rsuite/dist/rsuite.min.css"; 
import { Dropdown } from "rsuite";
import { set } from 'rsuite/esm/internals/utils/date';

const Burger = ({setMyProfile}) => { 
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleMyProfileButton = () => {
        setMyProfile(true)
        //navigate('/profile');
    };

    const handleHome = () => {
        navigate('/home');
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div style={{ position: 'absolute', top: '15px', right: '45px' }}> 
            <MenuOutlinedIcon onClick={handleToggle} style={{ cursor: 'pointer' }} />
            {open && (
                <Dropdown 
                    open={true}
                    onSelect={() => setOpen(false)}
                    style={{ position: 'absolute', top: '30px', right: '0px' }}
                >
                    {currentPath !== "/profile" && (
                        <Dropdown.Item onClick={handleMyProfileButton}>Profile</Dropdown.Item>
                    )}
                    {currentPath !== "/home" && (
                        <Dropdown.Item onClick={handleHome}>Home</Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown>
            )}
        </div>
    ); 
};

export default Burger;


