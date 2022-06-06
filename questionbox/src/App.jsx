import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import './App.css';
import ExistingUserSignIn from './components/login/ExistingUserSignIn/ExistingUserSignIn'
import QuestionDisplay from './components/QuestionDisplay/QuestionDisplay';
import AnswersList from './components/AnswersList/AnswersList'
import { QuestionPrompt } from './components/QuestionPrompt/QuestionPrompt';

const App = () => {
  //using local storage to hold onto token issued by API upon successful login
  const [token, setToken] = useLocalStorageState('reactLibraryToken', '')
  const [username, setUsername] = useLocalStorageState('reactLibraryUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const isLoggedIn = username && token

  if (!isLoggedIn) {
    return <>
      <ExistingUserSignIn setAuth={setAuth} />
      <QuestionDisplay />
      <AnswersList />
    </>
  }

  return (
    <>
      <QuestionPrompt />
      <QuestionDisplay />
      <AnswersDisplay />
    </>
  );
}

export default App;