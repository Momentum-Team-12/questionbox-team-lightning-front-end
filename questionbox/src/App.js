import React from 'react';
import './App.css';
import {QuestionDisplay} from './components/QuestionDisplay/QuestionDisplay';
import AnswersDisplay from './components/AnswersDisplay/AnswersDisplay'
import { QuestionPrompt } from './components/QuestionPrompt/QuestionPrompt';

function App() {

  return (
    <div className="App">
      <QuestionPrompt />
      <QuestionDisplay />
      <AnswersDisplay />
    </div>
  );
}

export default App;
