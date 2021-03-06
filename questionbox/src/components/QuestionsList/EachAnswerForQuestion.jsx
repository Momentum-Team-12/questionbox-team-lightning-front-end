import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Typography from '@mui/material/Typography';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import axios from 'axios';



export default function EachAnswerForQuestion({ QuestionId, QuestionAsker, isLoggedIn, username, token }) {
    const [allAnswers, setAllAnswers] = useState([])
    const [selectedAnswerId, setSelectedAnswerId] = useState('')

    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}/answers`)
            .then((res) => {
                setAllAnswers(res.data)
                console.log(res.data)
            },
            )
    }, [])

    function handleMarkAccepted({ AnswerId }) {
        console.log(AnswerId)
        console.log(token)
        setSelectedAnswerId(AnswerId)
        axios
            .patch(
                `https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}/answers/${AnswerId}/accept`,
                {
                    "accepted": true,
                },
                {
                    headers: { Authorization: `token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
            })
            .catch((e) => {
            })
    }

    function handleMarkUnaccepted({ AnswerId }) {
        console.log(AnswerId)
        console.log(token)
        setSelectedAnswerId(AnswerId)
        axios
            .patch(
                `https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}/answers/${AnswerId}/accept`,
                {
                    "accepted": false,
                },
                {
                    headers: { Authorization: `token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
            })
            .catch((e) => {
            })
    }

    return (
        <>
            {allAnswers.map((eachAnswer, res) => {
                const Answer = eachAnswer.response
                const AnswerId = eachAnswer.id
                const EachAnswerer = eachAnswer.responder
                const CreatedDate = eachAnswer.created_at
                const ModifiedDate = eachAnswer.modified_on
                const AcceptedAnswer = eachAnswer.accepted
                return (
                    <Card sx={{ m: 2, border: 1 }} key={AnswerId}>
                        <Button endIcon={<ArrowForwardRoundedIcon />}>
                            @{EachAnswerer}
                        </Button>
                        <Button>
                            @{QuestionAsker}
                        </Button>
                        <CardContent>
                            {CreatedDate.value === ModifiedDate.value ? (
                                <Typography>
                                    Answered {CreatedDate}
                                </Typography>
                            ) : (
                                <Typography>
                                    Answered {CreatedDate} Updated {ModifiedDate}
                                </Typography>
                            )}
                            <Typography variant="p">
                                {Answer}
                            </Typography>
                        </CardContent>
                        <Box>
                            {isLoggedIn && QuestionAsker === username ? (
                                <CardActions>
                                    <Box>
                                        {AcceptedAnswer === true ? (
                                            <Button variant="contained" value={AnswerId} onClick={() => handleMarkUnaccepted({ AnswerId })} endIcon={<AutoAwesomeIcon />}>
                                                Accepted Answer
                                            </Button>
                                        ) : (
                                            <Button variant="outlined" value={AnswerId} onClick={() => handleMarkAccepted({ AnswerId })} endIcon={<AutoAwesomeOutlinedIcon />}>
                                                Accept
                                            </Button>
                                        )}
                                    </Box>
                                </CardActions>
                            ) : (
                                <CardActions>
                                    <Box>
                                        {AcceptedAnswer === true ? (
                                            <Button disabled variant="contained" value={AnswerId} endIcon={<AutoAwesomeIcon />}>
                                                Accepted by {QuestionAsker}
                                            </Button>
                                        ) : (
                                            <Box></Box>
                                        )}
                                    </Box>
                                </CardActions>
                            )}
                        </ Box>
                    </Card>
                )
            })}
        </>
    )
}