import React from 'react';
import './QuestionNavigator.css'; // Import CSS for the question navigator

const QuestionNavigator = ({ totalQuestions, currentQuestionIndex, navigateToQuestion, attemptedOptions }) => {
    return (
        <div className="question-navigator">
            <div className="question-header">
                <h3>Questions</h3>
                <hr></hr>
            </div>
            <div className='question-grid'>

                {Array.from({ length: totalQuestions }, (_, index) => (
                    <button
                        key={index}
                        className={`question-number ${index === currentQuestionIndex ? 'active' : ''} ${attemptedOptions[index] ? '' : 'unanswered'}`}
                        onClick={() => navigateToQuestion(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionNavigator;