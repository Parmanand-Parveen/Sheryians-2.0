import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  question: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  optionsGrid: {
    display: 'grid',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    textAlign: 'left',
    transition: 'background-color 0.2s',
  },
  buttonCorrect: {
    backgroundColor: '#4CAF50',
    color: 'white',
    borderColor: '#4CAF50',
  },
  buttonIncorrect: {
    backgroundColor: '#f44336',
    color: 'white',
    borderColor: '#f44336',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  nextButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  score: {
    fontSize: '1rem',
  },
  resultsContainer: {
    textAlign: 'center',
  },
  resultsScore: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  restartButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};

const WordQuiz = () => {


  const { word } = useSelector((state) => state.words);
  const navigate = useNavigate()
  const wordPairs =word.filter((item) => !item.isLearnt);


  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateQuestion = () => {
    if (questionCount >= wordPairs.length) {
      setQuizComplete(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const question = wordPairs[randomIndex];
    
    // Generate wrong options from other translations
    let wrongOptions = wordPairs
      .filter(pair => pair.translation !== question.translation)
      .map(pair => pair.translation)
      .slice(0, 3);
    
    // Combine correct and wrong options, then shuffle
    const allOptions = shuffleArray([...wrongOptions, question.translation]);
    
    setCurrentQuestion(question);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.translation) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setQuestionCount(questionCount + 1);
    generateQuestion();
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionCount(0);
    setQuizComplete(false);
    generateQuestion();
  };

  if (quizComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.resultsContainer}>
            <h2 style={styles.title}>Quiz Complete!</h2>
            <p style={styles.resultsScore}>
              Your score: {score} out of {wordPairs.length}
            </p>
            <p>
              Percentage: {((score / wordPairs.length) * 100).toFixed(1)}%
            </p>
            <button 
              style={styles.restartButton}
              onClick={handleRestart}
            >
              Restart Quiz
            </button>
            <button onClick={() => navigate("/")}>Go to home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title} className='dark:text-gray-100'>
            Question {questionCount + 1} of {wordPairs.length}
          </h2>
        </div>
        
        <div style={styles.question} className='dark:text-gray-100'>
          What is the translation of "{currentQuestion?.word}"?
        </div>

        <div style={styles.optionsGrid}>
          {options.map((option, index) => {
            let buttonStyle = { ...styles.button };
            if (isAnswered) {
              if (option === currentQuestion.translation) {
                buttonStyle = { ...buttonStyle, ...styles.buttonCorrect };
              } else if (option === selectedAnswer) {
                buttonStyle = { ...buttonStyle, ...styles.buttonIncorrect };
              }
            }

            return (
              <button
                key={index}
                style={buttonStyle}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div style={styles.footer}>
          <div style={styles.score} className='dark:text-gray-100'>
            Score: {score}/{questionCount}
          </div>
          {isAnswered && (
            <button
              style={styles.nextButton}
              onClick={handleNextQuestion}
            >
              {questionCount === wordPairs.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordQuiz;