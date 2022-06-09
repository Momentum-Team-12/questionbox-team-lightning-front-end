import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Error404 from './components/Error404/Error404'
import NavigationBar from './components/NavigationBar/NavigationBar'
// import ExistingUserSignIn from './components/NavigationBar/login/ExistingUserSignIn/ExistingUserSignIn';
import SignIn from './components/NavigationBar/SignIn/SignIn'
import SignUp from './components/NavigationBar/SignUp/SignUp'
import AnswersList from './components/AllQuestions/AllQuestions'
import { QuestionPrompt } from './components/QuestionPrompt/QuestionPrompt'
import AddQuestionButton from './components/AddQuestionButton/AddQuestionButton'

const App = () => {
  //using local storage to hold onto token issued by API upon successful login
  const [token, setToken] = useLocalStorageState('reactQuestionboxToken', '')
  const [username, setUsername] = useLocalStorageState(
    'reactQuestionboxUsername',
    ''
  )

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const isLoggedIn = username && token

  const handleLogout = () => {
    axios
      .post(
        'https://questionbox-team-lightning.herokuapp.com/auth/token/logout',
        {},
        {
          headers: { Authorization: `token ${token}` },
        }
      )
      .then((res) => {
        setAuth('', '')
      })
  }

  return (
    <BrowserRouter>
      <NavigationBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddQuestionButton isLoggedIn={isLoggedIn} />
              <AnswersList />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <SignIn
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
          }
        ></Route>
        <Route path="/join" element={<SignUp />}></Route>
        <Route path="/questions/add" element={<QuestionPrompt />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App