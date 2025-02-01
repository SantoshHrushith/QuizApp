import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import the Navbar component
import './Home.css'; // Import CSS for the home page

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='home'>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to TestlineQuiz</h1>
        <p>Test your knowledge with our quiz!</p>
        <button onClick={() => navigate('/quiz')}>Start Quiz</button>
      </div>
    </div>
  );
};

export default Home;