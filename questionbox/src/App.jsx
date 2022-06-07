import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
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
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<ExistingUserSignIn isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}></Route>
        <Route path="/questions/add" element={<QuestionPrompt />}></Route>
      </Routes>
      <QuestionDisplay />
      <AnswersList />
    </BrowserRouter>
  </>
}


export default App;
