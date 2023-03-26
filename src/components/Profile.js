import axios from "axios";
import React, { useEffect, useState } from 'react';

function Profile(props) {
  const [UserId, setUserId] = useState({id: ""})
  function getData() {
    const storageid = localStorage.getItem('user_id')
    setUserId({id: storageid})
    axios({
      method: 'GET',
      maxBodyLength: Infinity,
      url: '/profile',
      params: {
        'user_id': UserId.id
      },
      headers: { 
        'Authorization': 'Bearer ' + props.token,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      
      console.log(response.data)
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
              <p>ID: {UserId.id}</p>
            </div>
        }

    </div>
  );
}

export default Profile;