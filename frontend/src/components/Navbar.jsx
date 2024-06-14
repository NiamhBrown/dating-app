import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { React, useState } from "react";
import { SearchBar } from './searchbar/SearchBar';
import { SearchResultsList } from "./searchbar/SearchResultsList";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import './Navbar.css'; 
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
    </div>
  );
};

export default Navbar;
