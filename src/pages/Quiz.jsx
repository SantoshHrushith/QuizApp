import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // Import the Confetti component from react-confetti
import useSound from 'use-sound'; // Import the useSound hook
import correctSound from '../sound/correct.mp3'; // Import the correct answer sound
import wrongSound from '../sound/wrong.mp3'; // Import the wrong answer sound
import Navbar from '../components/Navbar';
import QuestionNavigator from '../components/QuestionNavigator'; // Import the QuestionNavigator component
import Countdown from '../components/CountDown'; // Import the Countdown component
import './Quiz.css'; // Import CSS for animations and progress bar
import { RiTimerFill } from "react-icons/ri";
import LoadingScreen from '../components/LoadingScreen';


const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [attemptedOptions, setAttemptedOptions] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display
  const [showCountdown, setShowCountdown] = useState(true); // State to control countdown display

  const navigate = useNavigate();

  // Load sounds
  const [playCorrectSound] = useSound(correctSound);
  const [playWrongSound] = useSound(wrongSound);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.jsonserve.com/Uw5CrX'));
        const data = JSON.parse(response.data.contents);
        data.questions = shuffleArray(data.questions); // Shuffle the questions
        setQuizData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Time is up, handle quiz end
      handleSubmit();
    }
  }, [timeLeft]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (option) => {
    // Prevent changing answers once an option is chosen
    if (attemptedOptions[currentQuestionIndex] !== undefined) {
      return;
    }

    const isCorrect = option.is_correct;
    const correctAnswerMarks = parseFloat(quizData.correct_answer_marks);
    const negativeMarks = parseFloat(quizData.negative_marks);

    if (isCorrect) {
      setScore(score + correctAnswerMarks);
      setShowConfetti(true); // Show confetti when the correct answer is chosen
      playCorrectSound(); // Play correct answer sound
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    } else {
      setScore(score - negativeMarks);
      playWrongSound(); // Play wrong answer sound
    }

    const updatedAttemptedOptions = [...attemptedOptions];
    updatedAttemptedOptions[currentQuestionIndex] = { questionIndex: currentQuestionIndex, chosenOption: option, isCorrect };
    setAttemptedOptions(updatedAttemptedOptions);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000); // 2 minutes in milliseconds

  };

  const handleSubmit = () => {
    navigate('/results', { state: { score, totalQuestions: quizData.questions.length, attemptedOptions, quizData } });
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className='quiz-page'>
      {showCountdown && <Countdown onComplete={() => setShowCountdown(false)} />}
      {!showCountdown && (
        <>
          <Navbar />
          {showConfetti && <Confetti />} {/* Display confetti when showConfetti is true */}
          <div className="quiz-layout">
            <QuestionNavigator
              totalQuestions={quizData.questions.length}
              currentQuestionIndex={currentQuestionIndex}
              navigateToQuestion={navigateToQuestion}
              attemptedOptions={attemptedOptions}
            />
            <div className="quiz-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <h1>{quizData.title}</h1>
              <p>{quizData.description}</p>
              <div className="timer">
                <RiTimerFill size={22} /> {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60} minutes
              </div>
              <hr></hr>
              <h3>{currentQuestion.description}</h3>
              <ul>
                {currentQuestion.options.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => handleAnswer(option)}
                    className={`option ${attemptedOptions[currentQuestionIndex]?.chosenOption.id === option.id ? (option.is_correct ? 'correct' : 'incorrect') : ''} ${attemptedOptions[currentQuestionIndex] && option.is_correct ? 'correct' : ''}`}
                  >
                    {option.description}
                  </li>
                ))}
              </ul>
              <button className='prev' onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              {currentQuestionIndex === quizData.questions.length - 1 ? (
                <button className='submit' onClick={handleSubmit}>Submit</button>
              ) : (
                <button className='next-button' onClick={handleNextQuestion}>
                  Next
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;