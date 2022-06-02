import React from 'react';
import './App.css';
import QuestionDisplay from './components/QuestionDisplay/QuestionDisplay';
import AnswersDisplay from './components/AnswersDisplay/AnswersDisplay'

function App() {

  return (
    <div className="App">
      <QuestionDisplay />
      <AnswersDisplay />
    </div>
  );
}

export default App;
