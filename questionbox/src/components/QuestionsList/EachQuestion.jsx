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
import Typography from '@mui/material/Typography';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import axios from 'axios';
import EachAnswerForQuestion from './EachAnswerForQuestion'


export default function EachQuestion({ eachQuestion, index, isLoggedIn, username, token }) {
    const [expanded, setExpanded] = React.useState(false);
    const [allQuestions, setAllQuestions] = useState([])
    const QuestionAsker = eachQuestion.creator
    const QuestionTitle = eachQuestion.title
    const QuestionBody = eachQuestion.body
    const Favorites = eachQuestion.favorite_count
    const Answers = eachQuestion.total_answers
    const CreatedDate = eachQuestion.created_at
    const ModifiedDate = eachQuestion.modified_on
    const QuestionId = eachQuestion.id

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    // const handleFavorite = (event) => {
    //     event.preventDefault()
    //     console.log(event)
    //     setError('')
    //     axios
    //         .post(
    //             `https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}`/answers/<int:pk>/accept,
    //             {
    //                 "accepted": true,
    //             },
    //             {
    //                 headers: { Authorization: `token ${token}` },
    //             }
    //         )
    //         .then((res) => {
    //             console.log(res.status)
    //         })
    //         .catch((e) => {
    //             e.message === 'Request failed with status code 401'
    //                 ? setError(
    //                     'This request is invalid.'
    //                 )
    //                 : setError(
    //                     'An unknown error occured. Please try again.'
    //                 )
    //             setOpen(true)
    //         })
    // }

    return (
        <Box sx={{ maxWidth: "97vw" }}>
            <Card key={index}>
                <Button>
                    @{QuestionAsker}
                </Button>
                <CardContent>
                    <Typography>
                        Created {CreatedDate} Updated {ModifiedDate}
                    </Typography>
                    <Typography variant="h5" expand={expanded} onClick={handleExpandClick} sx={{ cursor: "pointer", userSelect: "none" }}>
                        {QuestionTitle}
                    </Typography>
                    <Typography variant="p">
                        {QuestionBody}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Box>
                        {!isLoggedIn ? (
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
                        ) : (
                            <CardActions>
                                <IconButton aria-label="favorite this question">
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
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    )
}

// return (
//     <Box>
//         {!isLoggedIn ? (
//             <CardActions>
//                 <IconButton aria-label="favorite this question">
//                     <StarBorderOutlinedIcon color="primary" />
//                 </IconButton>
//                 <Typography>{Favorites}</Typography>
//                 <Typography>Log in to favorite</Typography>
//                 <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
//                     <InsertCommentIcon color="primary" />
//                 </IconButton>
//                 <Typography>{Answers}</Typography>
//             </CardActions>
//         ) : (
//             <CardActions>
//                 <IconButton aria-label="favorite this question">
//                     <StarBorderOutlinedIcon color="primary" />
//                 </IconButton>
//                 <Typography>{Favorites}</Typography>
//                 <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
//                     <InsertCommentIcon color="primary" />
//                 </IconButton>
//                 <Typography>{Answers}</Typography>
//             </CardActions>
//         )}
//     </ Box>
// );