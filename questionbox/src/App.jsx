import React from 'react';
import './App.css';
import QuestionDisplay from './components/QuestionDisplay/QuestionDisplay';
import AnswersList from './components/AnswersDisplay/AnswersList'

function App() {

  return (
    <div className="App">
      <QuestionDisplay />
      <AnswersList />
    </div>
  );
}

export default App;
