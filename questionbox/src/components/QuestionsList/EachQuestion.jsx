import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import axios from 'axios';
import EachAnswerForQuestion from './EachAnswerForQuestion';
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create';


export default function EachQuestion({ eachQuestion, index, isLoggedIn, username, token }) {
    const [expanded, setExpanded] = React.useState(false);
    const [response, setResponse] = useState('')
    const [error, setError] = useState('')
    const QuestionAsker = eachQuestion.creator
    const QuestionTitle = eachQuestion.title
    const QuestionBody = eachQuestion.body
    const Answers = eachQuestion.total_answers
    const CreatedDate = eachQuestion.created_at
    const ModifiedDate = eachQuestion.modified_on
    const QuestionId = eachQuestion.id

    const buttonStyle = {
        margin: 5,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 100,
        position: 'inherit',
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    function handleAnswerSubmit({ QuestionId }) {
        setError('')
        axios
            .post(
                `https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}/answers`,
                {
                    "response": response,
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
        console.log('Answer posted!')
        console.log(error)
    }

    return (
        <Box sx={{ m: 2 }}>
            <Card key={index}>
                <Button>
                    @{QuestionAsker}
                </Button>
                <CardContent>
                    {CreatedDate.value === ModifiedDate.value ? (
                        <Typography>
                            Asked {CreatedDate}
                        </Typography>
                    ) : (
                        <Typography>
                            Updated {CreatedDate} Updated {ModifiedDate}
                        </Typography>
                    )}
                    < Typography variant="h5" expand={expanded} onClick={handleExpandClick} sx={{ cursor: "pointer", userSelect: "none" }}>
                        {QuestionTitle}
                    </Typography>
                    <Typography variant="p">
                        {QuestionBody}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box>
                        {isLoggedIn ? (
                            <CardActions>
                                <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
                                    <InsertCommentIcon color="primary" />
                                </IconButton>
                                <Typography>{Answers}</Typography>
                            </CardActions>
                        ) : (
                            <CardActions>
                                <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
                                    <InsertCommentIcon color="primary" />
                                </IconButton>
                                <Typography>{Answers}</Typography>
                            </CardActions>
                        )}
                    </ Box>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <EachAnswerForQuestion QuestionId={QuestionId} QuestionAsker={QuestionAsker} isLoggedIn={isLoggedIn} username={username} token={token} />
                        <Box>
                            {isLoggedIn ? (
                                <Box>
                                    <Box component="form" onSubmit={() => handleAnswerSubmit({ QuestionId })}>
                                        <Box>
                                            <TextField
                                                label="answer"
                                                id="outlined-multiline-static"
                                                rows={4}
                                                value={response}
                                                onChange={(e) => setResponse(e.target.value)} />
                                        </Box>
                                    </Box>
                                    <Fab variant="extended"
                                        style={buttonStyle}
                                        value={QuestionId}
                                        color="primary"
                                        aria-label="add"
                                        onClick={() => handleAnswerSubmit({ QuestionId })}
                                    >
                                        <CreateIcon />
                                        Add Answer
                                    </Fab>
                                </Box>
                            ) : (
                                <Box></Box>
                            )}
                        </ Box>
                    </CardContent>
                </Collapse>
            </Card>
        </Box >
    )
}