import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import HomeVideo from './Home.mp4'; 

const Home = () => {
  const [name, setName] = useState('');
  const [loc, setLoc] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, loc, phone, email };
    try {
      const response = await fetch('http://localhost:5000/api/datas/Home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setName('');
        setLoc('');
        setPhone('');
        setEmail('');
        navigate(`/Weather1?name=${name}&loc=${loc}`);
      } else {
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <div className="container">
      <video autoPlay loop muted className="background-video">
        <source src={HomeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className="title">WEATHER FINDER</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Mobile Number:</label>
          <input type="text" id="phone" placeholder="Enter Your Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Your Location:</label>
          <input type="text" id="location" placeholder="Enter Your Location" value={loc} onChange={(e) => setLoc(e.target.value)} className="input-field" required />
        </div>
        <button type="submit" className="submit-btn">Click Here</button>
      </form>
    </div>
  );
};

export default Home;
