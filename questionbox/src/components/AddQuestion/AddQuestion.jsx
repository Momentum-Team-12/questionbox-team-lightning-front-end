import * as React from 'react'
import { Link } from "react-router-dom";
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

export default function AddQuestion({ isLoggedIn, token, username }) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [creator, setCreator] = useState(username)
    const [error, setError] = useState('')
    const [open, setOpen] = React.useState(false)

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace={true} />
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setError('')
        setOpen(false)
    }

    function handleQuestionSubmit({ title, body, username, creator }) {
        // event.preventDefault()
        // console.log(event)
        setError('')
        setCreator(username)
        console.log(creator)
        axios
            .post(
                `https://questionbox-team-lightning.herokuapp.com/api/questions/`,
                {
                    "title": title,
                    "body": body,
                    "creator": username
                },
                {
                    headers: { Authorization: `token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
            })
            .catch((e) => {
                e.message === 'Request failed with status code 401'
                    ? setError(
                        'This request is invalid.'
                    )
                    : setError(
                        'An unknown error occured. Please try again.'
                    )
            })
        console.log(error)
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
                        Add a question
                    </Typography>
                    {/* <Typography>
                        Posting as @{username}
                    </Typography> */}
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
                    <Box component="form" onSubmit={() => handleQuestionSubmit({ title, body, creator })}>
                        <Box>
                            <TextField
                                label="Posting as:"
                                value={username}
                                margin="normal"
                                onChange={(e) => setTitle(e.target.value)} />
                        </Box>
                        <Box>
                            <TextField
                                label="title"
                                value={title}
                                margin="normal"
                                onChange={(e) => setTitle(e.target.value)} />
                        </Box>
                        <Box>
                            <TextField
                                label="body"
                                id="outlined-multiline-static"
                                rows={4}
                                value={body}
                                onChange={(e) => setBody(e.target.value)} />
                        </Box>
                        <Box textAlign="center">
                            <Button size="large" type="submit" onClick={() => handleQuestionSubmit({ title, body })} component={Link} to="/">Add question</Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
