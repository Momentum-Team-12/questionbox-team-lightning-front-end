import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Error404 from './components/Error404/Error404'
import NavigationBar from './components/NavigationBar/NavigationBar'
import EachQuestion from './components/QuestionsList/EachQuestion'
import SignIn from './components/NavigationBar/SignIn/SignIn'
import SignUp from './components/NavigationBar/SignUp/SignUp'
import AddQuestion from './components/AddQuestion/AddQuestion'
import AddQuestionButton from './components/AddQuestion/AddQuestionButton'

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

  const QuestionsList = ({ isLoggedIn, username, token }) => {
    const [allQuestions, setAllQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      axios
        .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
        .then((res) => {
          console.log(res.data)
          setAllQuestions(res.data)
          setIsLoading(false)
        })
    }, [])

    if (isLoading) {
      return (
        <Box>
          <CircularProgress />
        </Box>
      )
    }

    return (
      <>
        {allQuestions.map((eachQuestion, index) => {
          return (
            <Box key={index}>
              <EachQuestion eachQuestion={eachQuestion} index={index} isLoggedIn={isLoggedIn} username={username} token={token} />
            </Box>
          )
        })}
      </>
    )
  }

  return (
    <BrowserRouter>
      <NavigationBar isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddQuestionButton isLoggedIn={isLoggedIn} />
              <QuestionsList isLoggedIn={isLoggedIn} username={username} token={token} />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
          }
        ></Route>
        <Route path="/join" element={<SignUp />}></Route>
        <Route path="/questions/add" element={<AddQuestion isLoggedIn={isLoggedIn} username={username} token={token} />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App