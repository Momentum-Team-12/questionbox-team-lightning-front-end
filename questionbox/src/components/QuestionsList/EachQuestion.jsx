import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import axios from 'axios';
import EachAnswerForQuestion from './EachAnswerForQuestion';
import AddAnswer from '../AnswersList/AddAnswer';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create';


export default function EachQuestion({ eachQuestion, index, isLoggedIn, username, token }) {
    const [expanded, setExpanded] = React.useState(false);
    const [response, setResponse] = useState('')
    const [error, setError] = useState('')
    const [allQuestions, setAllQuestions] = useState([])
    const QuestionAsker = eachQuestion.creator
    const QuestionTitle = eachQuestion.title
    const QuestionBody = eachQuestion.body
    const Favorites = eachQuestion.favorite_count
    const Answers = eachQuestion.total_answers
    const CreatedDate = eachQuestion.created_at
    const ModifiedDate = eachQuestion.modified_on
    const QuestionId = eachQuestion.id
    const IsFavorited = eachQuestion.favorite

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
        // event.preventDefault()
        // console.log(event)
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





    function handleFavorite({ QuestionId }) {
        // event.preventDefault()
        // console.log(event)
        axios
            .post(
                `https://questionbox-team-lightning.herokuapp.com/questions/${QuestionId}/favorites`,
                {
                    "favorite": true,
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
        console.log('Favorite added!')
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
                                <Box>
                                    {IsFavorited === true ? (
                                        <Button variant="contained" value={QuestionId} onClick={() => handleFavorite({ QuestionId })} endIcon={<StarBorderOutlinedIcon />}>
                                            You favorited this
                                        </Button>
                                    ) : (
                                        <Button variant="outlined" value={QuestionId} onClick={() => handleFavorite({ QuestionId })} endIcon={<StarBorderOutlinedIcon />}>
                                            Want to favorite?
                                        </Button>
                                    )}
                                </Box>
                                <IconButton aria-label="favorite this question" value={QuestionId} onClick={() => handleFavorite({ QuestionId })}>
                                    <StarBorderOutlinedIcon color="primary" />
                                </IconButton>
                                <Typography>{Favorites}</Typography>
                                <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
                                    <InsertCommentIcon color="primary" />
                                </IconButton>
                                <Typography>{Answers}</Typography>
                            </CardActions>
                        ) : (
                            <CardActions>
                                <IconButton aria-label="favorite this question" component={Link} to="/signin">
                                    <StarBorderOutlinedIcon color="primary" />
                                </IconButton>
                                <Typography>{Favorites}</Typography>
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
                    </CardContent>
                </Collapse>
            </Card>
        </Box >
    )
}