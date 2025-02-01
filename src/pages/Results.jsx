import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Results.css';
import image from '../image/badge.png';
import { IoSpeedometer } from "react-icons/io5";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";



const Results = () => {
  const location = useLocation();
  const { score, totalQuestions, attemptedOptions, quizData } = location.state;
  const navigate = useNavigate();

  const correctAnswers = attemptedOptions.filter(option => option && option.isCorrect).length;
  const accuracy = correctAnswers / totalQuestions;

  return (
    <div>
      <Navbar />
      <div className="results-container">
        <h1>Quiz Results</h1>
        <img src={image} alt="badge" />
        <div className="results-summary">
          <div className="score">
            <div className="icon-container">
              <IoSpeedometer className='icon' />
            </div>
            <p>Score</p>
            <p>{score} / {totalQuestions * parseFloat(quizData.correct_answer_marks)}</p>
          </div>
          <div className="correct-answers">
            <div className="icon-container">
              <SiTicktick className='icon' />
            </div>
            <p>Correct</p>
            <p>{correctAnswers} / {totalQuestions}</p>
          </div>
          <div className="accuracy">
            <div className="icon-container">
              <BsFillRocketTakeoffFill className='icon' />
            </div>
            <p>Accuracy</p>
            <p>{Math.round(accuracy * 100)}%</p>
          </div>
        </div>
        <button className='solution' onClick={() => navigate('/detailed-solution', { state: { quizData, attemptedOptions } })}>
          Detailed Solution
        </button>
        <button className='cont' onClick={() => navigate('/')}>Continue</button>
      </div>
    </div>
  );
};

export default Results;