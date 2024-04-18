import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import  work from '../components/assets/work.png'
import user from '../components/assets/user.png'


const AllProfiles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
      });
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>
      <div className="nav-container">
      <nav >
          <div className="logo-setup">
          <img src = {work} alt = 'logo'/>
          <h1>Dev-Hub</h1>
          </div>
          <div className="reg-loin-container">
          <Link to="/myprofile" style = {{"textDecoration" : "none"  , color : "black"}}>
            <h2>My Profile</h2>
          </Link>
          <Link to="/register" style = {{textDecoration : "none"  , color : "black"}}>
            <h2 >Register</h2>
          </Link>
          </div>
        </nav>
      </div>
  


     <div className="allpro-container">
      <Link to="/allprofiles">
        <h1  style = {{textDecoration : "none",}} >Developers</h1>
      </Link>
      <p>Browse and connect with developers</p>


      <div  className="profile-container">
        {data.length >= 1 ? (
          data.map((profile) => (
            <div key={profile._id} className="prfiles" >
              <div>
              <img src = {user} alt = 'user.log'/>
              </div>

              <div className="profile-details">
              <h1>{profile.fullname}</h1>
              <p>{profile.email}</p>
              <p>kothuru,IN</p>
              <Link
                to={`/indprofile/${profile.fullname}/ ${profile.email}/ ${profile.skill}/ ${profile.id}`}
              >
                <button>View Profile</button>
              </Link>
              </div> 

              <div className="skill-components" >
              <ul>
                {profile.skill.split(",").map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              </div>
              </div>

          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default AllProfiles;
