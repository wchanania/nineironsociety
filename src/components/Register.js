import axios from "axios"
import React, { useEffect, useState } from 'react'


function Register(props) {

    const [registrationForm, setregistrationForm] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      zipcode: "",
    })

    function registerUser(event) {
      axios({
        method: "POST",
        url:"/register_user",
        data:{
            first_name: registrationForm.first_name,
            last_name: registrationForm.last_name,
            email: registrationForm.email,
            password: registrationForm.password,
            zipcode: registrationForm.zipcode
         }
      })
      .then((response) => {
        console.log(response.data.json())
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setregistrationForm(({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        zipcode: ""
        }))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setregistrationForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h1>Register</h1>
          <form className="registration">
            <input onChange={handleChange} 
                  type="first_name"
                  text={registrationForm.first_name} 
                  name="first_name" 
                  placeholder="First Name" 
                  value={registrationForm.first_name} />
            <input onChange={handleChange} 
                  type="last_name"
                  text={registrationForm.last_name} 
                  name="last_name" 
                  placeholder="Last Name" 
                  value={registrationForm.last_name} />
            <input onChange={handleChange} 
                  type="zipcode"
                  text={registrationForm.zipcode} 
                  name="zipcode" 
                  placeholder="zipcode" 
                  value={registrationForm.zipcode} />
            <input onChange={handleChange} 
                  type="email"
                  text={registrationForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={registrationForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  text={registrationForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={registrationForm.password} />
          <button onClick={registerUser}>Submit</button>
        </form>
      </div>
    );
}

export default Register;