import React, {useEffect, useState} from "react";
import "../styles/loginform.css"
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import ResponsiveAppBar from '../components/NavDashboard';
import EventBus from '../components/EventBus';
import { BorderColor } from "@mui/icons-material";
import axios from "axios";
import useToken from "../utils/useToken";



const LoginForm = () => {
	const navigate = useNavigate();
  const {token} = useToken();
  const {setTokens} = useToken();
	const {
		handleSubmit,
    getValues,
		control,
		formState: { isValid, errors },
	  } = useForm();

   const [loginErrorMeesage, setLoginErrorMeesage] = useState(null);
	
	  const onSubmit = async (data) =>  {
      //TODO: Loding admination is started
      console.log(isValid)
	     if(isValid) {

        console.log(getValues())
          await axios.post('/login', getValues())
          .then(login => {
            //TODO: Stop loading animatrion
           if(login && login.data.message) {
            setTokens(login.data.token)
            navigate('/home')
           }
          })
          
          .catch(error => {
             //TODO: Stop loading animatrion
            console.log('@@@', error)
            if(error) {
              setLoginErrorMeesage(error.response.data.message)
            }
          })
       }
	  };
	
     
    return (
        <div className="centered">            
		   
		   <Container maxWidth="md">
      
	  <Box mt={5} p={3} bgcolor="#61dafb40" borderRadius="5px" boxShadow={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* bgcolor="lightblue" */}
			<Box p={2} >             
			<Typography variant="h4" gutterBottom>
      <div class="logtitle">
    <h3>Wiki</h3>
        </div>		
        	</Typography>
			<Typography variant="h7" gutterBottom>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        	</Typography>
		
          <Box mt={4} p={7} style={{
      backgroundImage: 'url("https://wikiprospects.com/wp-content/uploads/2023/03/health-insurance.png")', 
      height:"100px", 
      backgroundSize: "70% 100%",   // Corrected property name and value
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      imagesize:"50%",
      marginLeft:"50px",
      boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)", // Assuming boxShadow is in the correct format
}}>
    <Typography color={'#ffffff'} variant="h7" gutterBottom>
      
    </Typography>
</Box>


    
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
			<Typography variant="h4" gutterBottom>
          User Login
        </Typography>
        {/* <form> */}
        <Controller
  name="username"
  control={control}
  defaultValue=""
  rules={{ required: 'Username is required' }}
  render={({ field, fieldState: { error } }) => (
    <>
      <TextField
        {...field}
        label="Enter your Email ID"
        variant="outlined"
        fullWidth
        error={!!error} // Use error instead of errors.username
        helperText={error ? error.message : ''} // Display error message if exists
        margin="normal"
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        InputProps={{
          classes: {
            root: 'custom-input-root',
            focused: 'custom-input-focused',
          },
        }}
      />
    </>
  )}
/>
<Controller
  name="password"
  control={control}
  defaultValue=""
  rules={{ required: 'Password is required' }}
  render={({ field, fieldState: { error } }) => (
    <>
      <TextField
        {...field}
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        error={!!error} // Use error instead of errors.password
        helperText={error ? error.message : ''} // Display error message if exists
        margin="normal"
        InputLabelProps={{
          style: { color: '#fff', BorderColor: '#fff' },
        }}
        InputProps={{
          classes: {
            root: 'custom-input-root',
            focused: 'custom-input-focused',
          },
        }}
      />
    </>
  )}
/>
		  <div fullWidth style={{textAlign: 'right', marginTop: 10, marginBottom: 10}}>
		<Link to={null} >Forgot your password?</Link>
		</div>

    {loginErrorMeesage && <div>{loginErrorMeesage}</div>}
          <Button size="large" 
          onClick={onSubmit}
          fullWidth
           type="submit"
            variant="contained"
             color="primary">
            Login
          </Button>		  
        {/* </form> */}
		<div fullWidth style={{textAlign: 'right', marginTop: 10}}>
		<Link to={'/register'} >Register Login</Link>
		</div>
		
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
            
        </div>
    )
}

export default LoginForm