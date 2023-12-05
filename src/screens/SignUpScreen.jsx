import React, {useEffect, useState} from "react";
import "../styles/loginform.css"
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	  } = useForm();
	
	  const onSubmit = (data) => {
		console.log(data);
		
	  };
	
    

    return (
      <div className="centered">                
		   
		   <Container maxWidth="md">
      
	  <Box mt={5} p={3} bgcolor="#61dafb40" borderRadius="5px" boxShadow={1}>
        <Grid container spacing={1}>          
            <Box p={2}>
			<Typography variant="h4" gutterBottom>
          User Register Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sig">
          <Controller
            name="employeeid" control={control} defaultValue="" rules={{ required: 'Employeeid is required' }}
            render={({ field }) => (
              <TextField
                {...field} label="Enter Your Employeeid" variant="outlined" fullWidth error={!!errors.employeeid}
                // helperText={errors.employeeid?.message}
                margin="normal"

                InputLabelProps={{
                  style: { color: '#fff' }, // Change label color here
                }}
                InputProps={{
                  classes: {
                    root: 'custom-input-root',
                    focused: 'custom-input-focused',
                  },
                }}
              
              />
            )}
          />

          <Controller
            name="firstname" control={control} defaultValue="" rules={{ required: 'Firstname is required' }}
            render={({ field }) => (
              <TextField
                {...field} label="Enter Your Firstname" variant="outlined" fullWidth error={!!errors.firstname}
                // helperText={errors.firstname?.message}
                margin="normal"

                InputLabelProps={{
                  style: { color: '#fff' }, // Change label color here
                }}
                InputProps={{
                  classes: {
                    root: 'custom-input-root',
                    focused: 'custom-input-focused',
                  },
                }}
              
              />
            )}
          />
         
         <Controller
            name="lastname" control={control} defaultValue="" rules={{ required: 'lastname is required' }}
            render={({ field }) => (
              <TextField
                {...field} label="Enter Your Lastname" variant="outlined" fullWidth error={!!errors.lastname}
                // helperText={errors.lastname?.message}
                margin="normal"

                InputLabelProps={{
                  style: { color: '#fff' }, // Change label color here
                }}
                InputProps={{
                  classes: {
                    root: 'custom-input-root',
                    focused: 'custom-input-focused',
                  },
                }}
              
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email Id is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Your Email Id"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                // helperText={errors.email?.message}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#fff' }, // Change label color here
                }}
                InputProps={{
                  classes: {
                    root: 'custom-input-root',
                    focused: 'custom-input-focused',
                  },
                }}
              />
            )}
          />

           <Controller
            name="department" control={control} defaultValue="" rules={{ required: 'department is required' }}
            render={({ field }) => (
              <TextField
                {...field} label="Enter Your Department" variant="outlined" fullWidth error={!!errors.department}
                // helperText={errors.department?.message}
                margin="normal"

                InputLabelProps={{
                  style: { color: '#fff' }, // Change label color here
                }}
                InputProps={{
                  classes: {
                    root: 'custom-input-root',
                    focused: 'custom-input-focused',
                  },
                }}
              
              />
            )}
          />


          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Your Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                // helperText={errors.password?.message}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#fff' }, // Change label color here
                }}
                InputProps={{
                  classes: {
                    root: 'custom-input-root',
                    focused: 'custom-input-focused',
                  },
                }}
              />
            )}
          />
          </div>
		  
          <Button size="large" fullWidth type="submit" variant="contained" color="primary">
            Register
          </Button>		  
        </form>
				
            </Box>
          </Grid>
      </Box>
    </Container>
        
        </div>
        
    )
}

export default SignUp