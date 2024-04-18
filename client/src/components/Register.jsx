import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    Confirmpassword: "",
    password: "",
    fullname: "",
    skill: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!data.fullname.trim()) {
      errors.fullname = "Full Name is required";
      isValid = false;
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!data.skill.trim()) {
      errors.skill = "Email is required";
      isValid = false;
    }

    if (!data.mobile.trim()) {
      errors.mobile = "Mobile number is required";
      isValid = false;
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 5 || !data.password.match(/\d.*\d/)) {
      errors.password = "Password must be at least 5 characters and contain 2 numbers";
      isValid = false;
    }

    if (data.password !== data.Confirmpassword) {
      errors.Confirmpassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(data);
      setData({
        Confirmpassword: "",
        password: "",
        fullname: "",
        skill: "",
        email : "",
        mobile: "",
      });
    }
  };

  return (
    <div className="reg-container">
      <form onSubmit={submitHandler}>
        <h1 className="reg-heading">*Register*</h1>
        <label htmlFor="name">Full Name :</label>
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          name="fullname"
          value={data.fullname}
          onChange={changeHandler}
          style = {{marginLeft : '234px',}}
        />
        {errors.fullname && <span className="error"  style={{ color: "red" }}>{errors.fullname}</span>}
        <br />

        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={changeHandler}
          style = {{marginLeft : '312px',}}
        />
        {errors.email && <span className="error" style={{ color: "red" }}>{errors.email}</span>}
        <br />

        <label htmlFor="mobile">Mobile :</label>
        <input
          type="text"
          id="mobile"
          placeholder="Mobile"
          name="mobile"
          value={data.mobile}
          onChange={changeHandler}
          style = {{marginLeft : '295px',}}
        />
        {errors.mobile && <span className="error"  style={{ color: "red" }}>{errors.mobile}</span>}
        <br />

        <label htmlFor="skill">Skills :</label>
        <input
          type="text"
          id="skill"
          placeholder="skills"
          name="skill"
          value={data.skill}
          onChange={changeHandler}
          style = {{marginLeft : '320px',}}
        />
        {errors.skill && <span className="error"  style={{ color: "red" }}>{errors.skill}</span>}
        <br />
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={changeHandler}
          style = {{marginLeft : '255px',}}
        />
        {errors.password && <span className="error" style={{ color: "red" }}>{errors.password}</span>}
        <br />

        <label htmlFor="cpassword">Confirm Password :</label>
        <input
          type="password"
          id="cpassword"
          placeholder="Confirm Password"
          name="Confirmpassword"
          value={data.Confirmpassword}
          onChange={changeHandler}
          style = {{marginRight : '2px',}}
        />
        {errors.Confirmpassword && (
          <span className="error" style={{ color: "red" }}>{errors.Confirmpassword}</span>
        )}
        <br />

        <Link to="/login"><button type="submit">Register</button></Link>
        <br />
        <p>
          If you have an account, <Link to="/login">Click to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
