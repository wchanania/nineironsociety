import React, {useEffect} from 'react'
import {useNavigate,redirect} from 'react-router-dom'
import axios from "axios";

function Logout(props) {
    let navigate = useNavigate();
    axios({
        method: "POST",
        url:"/logout",
        headers: {
            Authorization: 'Bearer ' + props.token
        }
    })
    .then((response) => {
        props.removeToken()
        navigate('/login')
    }).catch((error) => {
    if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    const navigateLogin = () => navigate('/login')

    return (
        <>
            <div onClick={navigateLogin}>Return to Login</div>
            
        </>
    )
}

export default Logout