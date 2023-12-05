import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import Profile from './screens/ProfileScreen';
import Search from './screens/SearchScreen';
import Protect from './protect-routes/Protect';
import SignUp from "./screens/SignUpScreen";
import EventBus from './components/EventBus';
import SearchBuild from "./screens/search_build";
import axios from "axios";
import useToken from "./utils/useToken";


// function logout() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate('/');
//   })
// }

axios.defaults.baseURL = 'http://3.83.55.217:8080/rest';
function App() {

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {deleteToken} = useToken();
axios.interceptors.request.use(
  config => {
    const tokens = sessionStorage.getItem('token');
  
    if(tokens) {
      config.headers['token'] = tokens;
    } else {
      deleteToken();
     // window.location = '/';
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    if(error.response.status === 401) {
     
      Promise.reject(error);
      deleteToken();
      window.location = '/';

    }
  }
)


  
  const loader = () => {
    console.log("dsfdsfsdf")
    const {token} = useToken();
    const navigate = useNavigate();
    if(token) {
      console.log("sdfsdfdsfsdfdsf")
      navigate('/home')
    }
  }
  useEffect(() => {
    const handleEvent = (data) => {
      setIsLoggedIn(data);
    };

    EventBus.subscribe('isLogin', handleEvent);
    // Clean up the subscription when the component unmounts
    return () => {
      EventBus.unsubscribe('isLogin', handleEvent);
    };
  }, []);

  return (
    <div className="App">
      
      {/* {isLoggedIn ? (
        <ResponsiveAppBar />
      ) : (
      // <LoginAppBar />
      null
      )} */}
      <Router>       
        <Routes>
        <Route path='/' loader={() => loader()} element={<Login />}></Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route element={<Protect />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>
          <Route path='/Search' element={<Search />}></Route>
          <Route exact path='/Searchs' element={<SearchBuild />}></Route>
          {/* <Route exact path='/Result' element={<Result />}></Route> */}
        </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
