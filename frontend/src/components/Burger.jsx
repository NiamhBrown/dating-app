import * as React from 'react';
import LogOutButton from './LogOutButton';
import myProfileButton from './myProfileButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import "rsuite/dist/rsuite.min.css"; 
import { Dropdown } from "rsuite";

    const Burger = () => { 

        const navigate = useNavigate()

        const handleLogout=()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            navigate('/login')
        };

        const handleMyProfileButton = () => {
            navigate('/profile');
        };

  return (
        <div style={{ marginTop: 20, width: 340 }}> 
          <Dropdown variant="contained" startIcon={<MenuOutlinedIcon/>} trigger="click"> 
            <Dropdown.Item onClick={handleMyProfileButton}>Profile</Dropdown.Item> 
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown> 
        </div>
  ); 
} ;

export default Burger;