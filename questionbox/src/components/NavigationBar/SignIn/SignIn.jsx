import * as React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignIn({ setAuth, isLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError('')
    setOpen(false)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log(event)
    setError('')
    axios
      .post(
        'https://questionbox-team-lightning.herokuapp.com/auth/token/login',
        {
          username: username,
          password: password,
        }
      )
      .then((res) => {
        console.log(res.data)
        setAuth(username, res.data.auth_token)
      })
      .catch((e) => {
        e.message === 'Request failed with status code 400'
          ? setError(
            'Your username or password is incorrect. Please try again.'
          )
          : setError(
            'An error occurred. Please check your username and password and try again.'
          )
        setOpen(true)
      })
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '75vh' }}
    >

      <Grid item xs={3}>
        <Box>
          <Typography variant="h4" align="center">
            Welcome
          </Typography>
          <Typography align="center">
            Please sign in to continue.
          </Typography>
          {error && (
            <Snackbar
              open={open}
              onClose={handleClose}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: '100%' }}
              >
                {error}
              </Alert>
            </Snackbar>
          )}
          <Box component="form" onSubmit={handleLogin}>
            <Box>
              <TextField
                label="username"
                value={username}
                margin="normal"
                onChange={(e) => setUsername(e.target.value)} />
            </Box>
            <Box>
              <TextField
                label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box textAlign="center">
              <Button size="large" component={Link} to="/join">Create account</Button>
            </Box>
            <Box textAlign="center">
              <Button size="large" variant="outlined" type="submit">Sign in</Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid >
  )
}
