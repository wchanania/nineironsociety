// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import Me from './pages/Me';




function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/me" element={<Me />}/>
        </Routes>
      </Router>
      
      <div>{getMessage.status === 200 ? 
      <h3>{getMessage.data.message}</h3>
      :
      <h3>LOADING</h3>}</div>
      </>
  );
}

export default App;