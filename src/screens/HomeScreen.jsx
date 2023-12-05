import React, {useEffect, useState} from "react";
import '../styles/home.css'
import { useNavigate, Link } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavDashboard';
import Header from "../components/header";
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import Footer from "../components/Footer";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';


const Home = () => {
  const navigate = useNavigate();

  const items = [
    { id: 1, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', title: 'Contact Level' },
    { id: 2, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', title: 'Location' },
    { id: 3, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', title: 'Company Size' },
    { id: 1, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', title: 'Industry' },
    { id: 2, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', title: 'Additional' },
    { id: 3, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', title: 'More...' },
  ];

  useEffect(() => {
    const handleBackClick = (event) => {
      event.preventDefault();
      // You can show a confirmation dialog here if you want
      // For demonstration purposes, we'll do nothing and stay on the Dashboard page
    };

    // Add an event listener for the popstate event (back button click)
    window.addEventListener('popstate', handleBackClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackClick);
    };
  }, []);

  const handleClick = () => {
    // Add your click event handling logic here
    console.log('Button clicked!');
  };

  return (
    <div>
      <Header />
      <div class="auth-bg"><span class="r">
        </span>
        <span class="r s">
          </span>
          <span class="r s">
            </span>
            <span class="r">
              </span>
              </div>
      {/* <Container>
        <Box mt={5} p={3} bgcolor="#abdbe3" borderRadius="5px" boxShadow={0}>
          
        </Box>

        <Box mt={5} p={3} bgcolor="white" borderRadius="5px" boxShadow={0}>
        
        </Box>
        
      </Container>       */}
      <div className="top-lay">
        <Typography variant="h4" gutterBottom>
          Lorem Ipsum is simply dummy text of the printing 
        </Typography>
        <Typography variant="h7" gutterBottom>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum 
        </Typography>
      </div>

      <div className="grid-container">
        {items.map((item) => (
          <div key={item.id} className="grid-item">
            <Container>
              <Box mt={5} p={2} bgcolor="#d4d2d2" borderRadius="5px" boxShadow={6}>
              <IconButton   aria-label="Your Icon">
                <PersonIcon className="rounded-icon" fontSize="50px"  style={{color: '#000', backgroundColor: '#fff'}}/>
              </IconButton>
              
                <Typography variant="h6" gutterBottom>{item.title}</Typography>
                <Typography variant="h7" gutterBottom>{item.content}</Typography><br></br>
                {/* <button className="touchable-button" onClick={handleClick}>
                  Get Started
                </button> */}
                <button className="touchable-button" onClick={handleClick}> <Link
                  to="/searchs"
                  state={{name: item.title}}
                >Get Started</Link></button>
              </Box>
            </Container>
          </div>
          
           
        ))}
      </div>
      <Typography variant="h6" gutterBottom>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </Typography>
      <Footer />
        
    </div>
  );
}

export default Home;
