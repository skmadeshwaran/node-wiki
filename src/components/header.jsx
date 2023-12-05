import React, {useEffect, useState} from "react";
import '../styles/header.css';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import useToken from "../utils/useToken";
import { useNavigate } from "react-router";
import axios from "axios";


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    
    const [loggedIn, setLoggedIn] = useState(true);
const [userName, setUserName] = useState('');
 const {setTokens} = useToken();
 const navigation = useNavigate();

const handleLogin = () => {
    
    setUserName("John Doe"); 
    setLoggedIn(true);
};
  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout');
      console.log(response)
      if (response.status === 201) {
        setTokens('');
        sessionStorage.removeItem('token');
        navigation('/')
      } else {
        
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };
   return  (
    <div className="menu">
        <div className="logo">
            Wiki DB
        </div>
        <div className="menuOption">
            <ul>
                <li><a href="/Home">Home</a></li>
                <li><a href="/searchs">Search & Build a List</a></li>
                <li><a href="#">Saved Search</a></li>
                <li><div className="customForm">
                     <span><FormatListBulletedIcon/></span>
                     <span>
                        <input placeholder="search for company" type="text"/>
                     </span>
                    </div></li>
            </ul>
        </div>
        <div className="login-infoo">
    <div className="login">
        {loggedIn ? (
            <div>
                {/* <span>Welcome, {userName}! </span> */}
                <button onClick={handleLogout}>
                <PersonSharpIcon />  Logout</button>
            </div>
        ) : (
            <button onClick={handleLogin}>
                <PersonSharpIcon />Login
            </button>
        )}
    </div>
</div>

    </div>
   )
}

export default Header;