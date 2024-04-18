import React, { useState } from 'react';
import axios from 'axios';
import { Navigate , Link } from 'react-router-dom'; 

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!data.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }   

    if (!data.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } 

    setErrors(errors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.post('http://localhost:5000/login', data)
        .then(res => {
          localStorage.setItem('token', res.data.token);
          setAuth(true);
        })
        .catch(err => {
          console.error('Error logging in:', err);
          alert('Failed to login. Please try again.');
        });
      
        console.log(data)
      setData({
        email: "",
        password: "",
      });
    }
  };

  if (auth) {
    return <Navigate to="/allprofiles" replace={true} />;
  }

  return (
    <div className="reg-container">
      <form onSubmit={submitHandler}>
        <h1 className="reg-heading">*SignIn*</h1>
        <label htmlFor='email'>EMAIL :</label>
        <input
          type='text'
          id='email'
          name='email'
          placeholder='email'
          value={data.email}
          onChange={changeHandler}
        /><br/>
        {errors.email && <span className="error" style={{ color: "red" }}>{errors.email}</span>}

        <label htmlFor='password'>PASSWORD : </label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          value={data.password}
          onChange={changeHandler}
        />  <br/>
        {errors.password && <span className="error" style={{ color: "red" }}>{errors.password}</span>}

        <button type='submit'>Login</button>
        <p>
          Don't have an account?  <Link to="/register"><span>Click to Register</span></Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
