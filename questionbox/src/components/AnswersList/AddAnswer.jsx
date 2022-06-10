import * as React from 'react';
import { Link } from "react-router-dom";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AddAnswer({ isLoggedIn, username, token, QuestionId, QuestionTitle }) {
    const [body, setBody] = useState('')
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

    const handleAnswerSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        setError('')
        // axios
        //     .post(
        //         `https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}/answers,
        //         {
        //             "response": body,
        //         },
        //         {
        //             headers: { Authorization: `token ${ token }` },
        //         }
        //     )
        //     .then((res) => {
        //         console.log(res.status)
        //     })
        //     .catch((e) => {
        //         e.message === 'Request failed with status code 401'
        //             ? setError(
        //                 'This request is invalid.'
        //             )
        //             : setError(
        //                 'An unknown error occured. Please try again.'
        //             )
        //         setOpen(true)
        //     })
    }

    return (
        <Grid
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '75vh' }}
        >
            <Grid item xs={3}>
                <Box>
                    <Typography variant="h4" align="center">
                        Add an answer for {QuestionTitle}
                    </Typography>
                    <Box component="form" onSubmit={handleAnswerSubmit}>
                        <Box>
                            <TextField
                                label="answer"
                                id="outlined-multiline-static"
                                rows={4}
                                value={body}
                                onChange={(e) => setBody(e.target.value)} />
                        </Box>
                        <Box textAlign="center">
                            <Button size="large" type="submit" component={Link} to="/">Add Answer</Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}