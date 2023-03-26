import React from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'


function Header(props) {
  const { token, removeToken, setToken } = useToken();
  let navigate = useNavigate();
  function logMeOut(event) {
    axios({
      method: "POST",
      url:"/logout",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
       props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    event.preventDefault()
    navigate("/login")
  }  
  return (
    <>
        <div className='header-wrapper'>
            <Link className='link left' to="/">Homepage</Link>
            <div className='right'>
                <Link className='link' to="/register">Register</Link>
                <Link className='link' to="/login">Login</Link>
                <Link className='link' onClick={logMeOut}>Logout</Link>
            </div>
        </div>
    </>
  )
}

export default Header