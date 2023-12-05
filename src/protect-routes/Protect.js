import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../screens/LoginScreen';
import useToken from '../utils/useToken';

const authuser = () => {
    const {token} = useToken();
    return !!token ? true : false;
}

const Protect = () => {
    const isAuth = authuser();
    return isAuth ? <Outlet /> : <Navigate to='/' />;
  }
  
  export default Protect;
  