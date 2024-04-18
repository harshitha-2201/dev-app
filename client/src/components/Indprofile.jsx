import React, { useState } from 'react';
import { useParams , Link } from 'react-router-dom';
import axios from 'axios';
import  work from '../components/assets/work.png'
import user from '../components/assets/user.png'


const Indprofile = () => {
  const { fullname, email, id , skill } = useParams();
  const [rating, setRating] = useState(null);
  const [taskprovider, setTaskprovider] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:5000/myprofile/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    })
      .then(res => setTaskprovider(res.data))
      .catch(error => {
        console.error('Error fetching review data:', error);
      });

    const review = {
      taskprovider,
      taskworker : id,
      rating,
    };

    axios.post('http://localhost:5000/addreview', review, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    })
      .then(res => alert(res.data))
      .catch(error => {
        console.error('Error adding review:', error);
       
      });
      setRating('');
  };

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

    <form onSubmit={submitHandler} className='indi-profile'>
      <div className='indpro-details'>
        <img src = {user} alt = 'user-logo'/>
        <h1>{fullname}</h1>
        <h3>{email}</h3>
        <h3>{skill}</h3>
        <p>Kothuru, Ts, IN</p>
      </div>

      <div className='ratings'>
        <h1 >Reviews & Rating</h1>
        <div className='reviews'>
        <label htmlFor="rating" ><p>Enter your review : </p> </label> <br/>
  
        <input
          type="text"
          id="rating"
          placeholder="Enter your rating out of 5"
          value={rating}
          onChange={e => setRating(e.target.value)}
          
        />  

        <button type="submit">Add Rating</button>
        </div>
      </div>
    </form>
    </div>

  );
};

export default Indprofile;
