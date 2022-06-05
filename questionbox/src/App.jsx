import React from 'react';
// import useLocalStorageState from 'use-local-storage-state'
import './App.css';
import ExistingUserSignIn from './components/login/ExistingUserSignIn/ExistingUserSignIn'
import QuestionDisplay from './components/QuestionDisplay/QuestionDisplay';
import AnswersList from './components/AnswersList/AnswersList'

const App = () => {

  return (
    <div className="App">
      <ExistingUserSignIn />
      <QuestionDisplay />
      <AnswersList />
    </div>
  );
}

export default App;
