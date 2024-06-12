import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { React, useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List"
// import "./App.css";
import { SearchBar } from './searchbar/SearchBar';
import { SearchResultsList } from "./searchbar/SearchResultsList";
import LogOutButton from './LogOutButton';
import myProfileButton from './myProfileButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';




const Navbar = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token")
    return (
      <div style={{display: 'flex', height: '100vh', flexDirection: 'row'}}>
        <ChatBubbleOutlineIcon style={{color: '#b6c8d9', fontSize: '50px', margin: '10px'}}/>
        <Sidebar className='sidebar'>
            <Menu 
            menuItemStyles={{
                button: {
                  // the active class will be added automatically by react router
                  // so we can use it to style the active menu item
                  [`&.active`]: {
                    backgroundColor: '#13395e',
                    color: '#b6c8d9',
                  },
                },
              }}
            >
                <SubMenu label="Navbar">
                    <div>
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && <SearchResultsList results={results} token={token}/>}
                    </div>
                </SubMenu>
                    {/* <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
            </Menu>
        </Sidebar>
      </div>
        )};

export default Navbar;

