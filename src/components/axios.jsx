import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [dataFromDB, setDataFromDB] = useState([]);
  const [newUserMessage, setNewUserMessage] = useState('');

  const apiUrl = 'http://127.0.0.1:8080/rest';

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username: 'test',
        password: 'test123',
      });
      if (response.status === 201) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${apiUrl}/logout`);
      if (response.status === 200) {
        setLoggedIn(false);
        setUserData({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data from DB
  const fetchDataFromDB = async () => {
    try {
      const response = await axios.post(`${apiUrl}/getdata`, {
        fields: 'company,masterid,companycounty',
        conditions: 'companycounty=Orange|Harris,company=mayo|heal,webaddress=org',
      });
      if (response.status === 200) {
        setDataFromDB(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add user
  const addUser = async () => {
    try {
      const response = await axios.post(`${apiUrl}/adduser`, {
        employeeid: 10,
        firstname: 'madhu',
        lastname: 'rav',
        email: 'test@gmail.com',
        department: 'testing',
        password: 'test@123',
      });
      if (response.status === 201) {
        setNewUserMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      // Fetch user data or perform other actions upon login
      // setUserData({...});
    }
  }, [loggedIn]);

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={fetchDataFromDB}>Fetch Data from DB</button>
          {dataFromDB.map((item) => (
            <div key={item.masterid}>
              <p>Company: {item.company}</p>
              <p>County: {item.companycounty}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={handleLogin}>Login</button>
          <p>{newUserMessage}</p>
          <button onClick={addUser}>Add User</button>
        </>
      )}
    </div>
  );
}

export default App;
