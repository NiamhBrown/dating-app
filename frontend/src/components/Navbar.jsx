import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { React, useState, useEffect } from "react";
import { SearchBar } from './searchbar/SearchBar';
import { SearchResultsList } from "./searchbar/SearchResultsList";
import LogOutButton from './LogOutButton';
import myProfileButton from './myProfileButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';





const Navbar = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token")
    return (
      <div>
        {/* This was inside div above: style={{display: 'flex', height: '100vh', flexDirection: 'row'}} */}
        <Sidebar style={{display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'flex-start', width: '300px'}}>
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
                <SubMenu label={<ChatBubbleOutlineIcon style={{color: '#b6c8d9', fontSize: '40px', margin: '10px'}}/>}>
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

