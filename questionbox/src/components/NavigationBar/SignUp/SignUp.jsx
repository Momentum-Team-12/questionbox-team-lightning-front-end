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
import { SentimentSatisfiedOutlined } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignIn({ setAuth, isLoggedIn }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
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
        // prevent the default action of the form, which is to make a request
        event.preventDefault()
        console.log(event)
        // clear errors since we could be re-submitting form data
        setError('')
        // Make an ajax request to the backend's URL for login
        // Use the username and password from state to send in the request body
        axios
            .post(
                'https://questionbox-team-lightning.herokuapp.com/auth/users/',
                {
                    username: username,
                    password: password,
                    re_password: password,
                    email: email
                }
            )
            .then((res) => {
                console.log(res.data)
                setAuth(username, res.data.auth_token)
            })
            .catch((e) => {
                e.message === 'Request failed with status code 400'
                    ? setError(
                        'Please try another username and password. The username may be taken, and/or your password is too short.'
                    )
                    : setError(
                        'Your account has been created. Please log in to continue.'
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
            spacing={10}
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
                        New to Questionbox? Create an account here.
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
                        <Box>
                            <TextField
                                label="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box textAlign="center">
                            <Button size="large" component={Link} to="/signin">Sign in</Button>
                        </Box>
                        <Box textAlign="center">
                            <Button size="large" variant="outlined" type="submit">Create account</Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}