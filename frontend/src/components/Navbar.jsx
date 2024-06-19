import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { React, useState, useEffect } from "react";
import { SearchBar } from './searchbar/SearchBar';
import { SearchResultsList } from "./searchbar/SearchResultsList";
import LogOutButton from './LogOutButton';
import myProfileButton from './myProfileButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import './Navbar.css'; 
import { MakeGC } from './MakeGC';

const Navbar = (props) => {
  const [results, setResults] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("token");

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };


  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'row' }}>
      <Sidebar 
        collapsed={collapsed} 
        className="custom-sidebar"  
        style={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'flex-start', width: collapsed ? '80px' : '300px' }}
      >
        <Menu 
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <SubMenu label={<ChatBubbleOutlineIcon style={{ color: '#b6c8d9', fontSize: '30px', margin: '10px' }} />}>
            <div>
              <SearchBar setResults={setResults} />
              {results && results.length > 0 && <SearchResultsList setChatting={props.setChatting} setChatterId={props.setChatterId} results={results} token={token}/>}
            </div>
            {/* <div>
              <MakeGC />
            </div> */}
          </SubMenu>

        </Menu>
      </Sidebar>
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '10px', 
          cursor: 'pointer' 
        }}
        onClick={handleToggleSidebar}
      >
        {collapsed ? <ArrowForwardIosOutlinedIcon /> : <ArrowBackIosOutlinedIcon />}
      </div>
        )};

export default Navbar;

