import * as React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useState } from 'react'
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

export default function SignUp({ setAuth, isLoggedIn }) {
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
        // prevent the default action of the form, which is to make a request
        event.preventDefault()
        console.log(event)
        // clear errors since we could be re-submitting form data
        setError('')
        // Make an ajax request to the backend's URL for login
        // Use the username and password from state to send in the request body
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
                    <Typography variant="h4">
                        Welcome
                    </Typography>
                    <Typography>
                        This the sign UP form. It's just the sign in form, copied for now.
                    </Typography>
                    {error && (
                        <Snackbar
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={6000}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                        <div>
                            <TextField
                                label="username"
                                value={username}
                                margin="normal"
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <TextField
                                label="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <Button size="large" type="submit">Sign in</Button>
                        </div>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}