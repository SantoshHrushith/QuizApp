import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './DetailedSolution.css';

const DetailedSolution = () => {
    const location = useLocation();
    const { quizData, attemptedOptions } = location.state;
    const navigate = useNavigate();
    const formatExplanation = (explanation) => {
        return explanation
        .replace(/\*\*Additional context:\*\*/gi, '<br><strong>Additional context:</strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n?\*(.*?)/g, ' <br>• $1')
    };
    return (
        <div className='detailed-solution-page'>
            <Navbar />
            <div className="detailed-solution-container">
                <h1>Detailed Solution</h1>
            </div>
            <div className="card">

                {quizData.questions.map((question, index) => (
                    <div key={question.id} className="detail-question-container">
                        <h2>{question.description}</h2>
                        <ul>
                            {question.options.map((option) => (
                                <li
                                    key={option.id}
                                    className={`option ${option.is_correct ? 'correct' : ''} ${attemptedOptions[index]?.chosenOption.id === option.id ? (option.is_correct ? 'chosen-correct' : 'chosen-incorrect') : ''}`}
                                >
                                    {option.description}
                                </li>
                            ))}
                        </ul>
                        
                        <div className="detailed-solution">
                            <h3>Detailed Solution:</h3>
                            <p dangerouslySetInnerHTML={{ __html: formatExplanation(question.detailed_solution) }}></p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="home-button-container"></div>
            <button className='home-button' onClick={() => navigate('/')}>Home</button>
        </div>
    );
};

export default DetailedSolution;