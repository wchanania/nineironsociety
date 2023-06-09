// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header token={removeToken}/>
          {!token && token!=="" &&token!== undefined?  
          <Login setToken={setToken} />
          :(
            <>
              <Routes>
                <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
              </Routes>
            </>
          )}
        </div>
        {/* <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/me" element={<Me />}/>
        </Routes> */}
      </BrowserRouter>
      </>
  );
}

export default App;