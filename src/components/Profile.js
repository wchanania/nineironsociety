import axios from "axios";
import React, { useEffect, useState } from 'react';

function Profile(props) {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    zipcode: "",
  })
  function getData() {
    const storageid = localStorage.getItem('user_id')
    console.log(storageid)
    axios({
      method: 'GET',
      maxBodyLength: Infinity,
      url: '/profile',
      params: {
        user_id: storageid
      },
      headers: { 
        'Authorization': 'Bearer ' + props.token,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      console.log(response.data[0].user_info.email)
      setProfileData(({
        first_name: response.data[0].user_info.first_name,
        last_name: response.data[0].user_info.last_name,
        email: response.data[0].user_info.email,
        zipcode: response.data[0].user_info.zipcode
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error)
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <div className="Profile">

        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {<div>
              <p>First Name: {profileData.first_name}</p>
              <p>Last Name: {profileData.last_name}</p>
              <p>Email: {profileData.email}</p>
              <p>Zip Code: {profileData.zipcode}</p>
            </div>
        }

    </div>
  );
}

export default Profile;