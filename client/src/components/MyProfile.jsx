import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import  work from '../components/assets/work.png'
import user from '../components/assets/user.png'



const MyProfile = () => {
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/myprofile", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setData([]);
      });

    axios
      .get("http://localhost:5000/myreview", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setReview(res.data))
      .catch((error) => {
        console.error("Error fetching review data:", error);
        setReview([]);
      });
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>
      <div className="nav-container">
        <nav>
          <div className="logo-setup">
            <img src={work} alt="logo" />
            <h1>Dev-Hub</h1>
          </div>
          <div className="reg-loin-container">
            <Link
              to="/allprofiles"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h2>All Profile</h2>
            </Link>
            <Link
              to ='/login'
              style={{ textDecoration: "none", color: "black" }}
              onClick = {() => localStorage.removeItem('token')} >
              <h2>Logout</h2>
            </Link>
          </div>
        </nav>
      </div>

      {data && (
        <div className='indi-profile'>
          <div className='indpro-details'>
            <h1>MY PROFILE</h1>
            <img src = {user} alt = 'user-logo'/>
            <Link to="/myprofile">  <h1>{data.fullname}</h1> </Link>
            <h3>{data.email}</h3>
            <h3>{data.skill}</h3>
            <p>Kothuru, Ts, IN</p>
          </div>

          <div  className='ratings'>
            <h1>Reviews & Rating</h1>
            <div  className='reviews'>
              {review &&
                review.map((review) => (
                  <div key={review.id}>
                    <h4>
                      <Link to="#">{review.taskprovider}</Link>
                    </h4>
                    <p>{review.rating}</p>
                  </div>
                ))}
            </div>

            <label htmlFor="rating">Enter your review</label>
            <input
              type="text"
              id="rating"
              placeholder="Enter your rating out of 5"
            />
            <button>Add Rating</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
