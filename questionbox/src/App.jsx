import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import './App.css';
import err404 from './components/err404/err404'
import NavigationBar from './components/NavigationBar/NavigationBar'
import ExistingUserSignIn from './components/NavigationBar/login/ExistingUserSignIn/ExistingUserSignIn'
import { QuestionDisplay } from './components/QuestionDisplay/QuestionDisplay';
import AnswersList from './components/AnswersList/AnswersList'
import { QuestionPrompt } from './components/QuestionPrompt/QuestionPrompt';

const App = () => {
  //using local storage to hold onto token issued by API upon successful login
  const [token, setToken] = useLocalStorageState('reactQuestionboxToken', '')
  const [username, setUsername] = useLocalStorageState('reactQuestionboxUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const isLoggedIn = username && token

  const handleLogout = () => {
    setAuth('', '')
  }

  return <>
    <NavigationBar />
    <ExistingUserSignIn isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    <QuestionDisplay />
    <AnswersList />
    <QuestionPrompt />
  </>
}


export default App;
