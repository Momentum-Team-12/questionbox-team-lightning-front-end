import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Typography from '@mui/material/Typography';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import axios from 'axios';
import EachQuestion from './EachQuestion';



export default function EachAnswerForQuestion({ QuestionId, QuestionAsker, isLoggedIn, username, token }) {
    const [allAnswers, setAllAnswers] = useState([])
    // console.log(QuestionAsker === username)
    const [selectedAnswerId, setSelectedAnswerId] = useState('')


    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/${QuestionId}/answers`)
            .then((res) => {
                setAllAnswers(res.data)
                console.log(res.data)
                // setSelectedAnswerId(res.data.id)
            },
            )
    }, [])

    function handleMarkAccepted({ AnswerId }) {
        console.log(AnswerId)
        setSelectedAnswerId(AnswerId)
        axios
            .post(
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
                    <Card key={AnswerId}>
                        <Button endIcon={<ArrowForwardRoundedIcon />}>
                            @{EachAnswerer}
                        </Button>
                        <Button>
                            @{QuestionAsker}
                        </Button>
                        <CardContent>
                            <Typography>
                                Created {CreatedDate} Updated {ModifiedDate}
                            </Typography>
                            <Typography variant="p">
                                {Answer}
                            </Typography>
                        </CardContent>
                        <Box>
                            {isLoggedIn && QuestionAsker === username ? (
                                <CardActions>
                                    <Box>
                                        {AcceptedAnswer.value === true ? (
                                            <Button endIcon={<AutoAwesomeIcon />}>
                                                ACCEPTED! click to unaccept
                                            </Button>
                                        ) : (
                                            <Button value={AnswerId} onClick={() => handleMarkAccepted({ AnswerId })} endIcon={<AutoAwesomeOutlinedIcon />}>
                                                NOT ACCEPTED. click me to accept
                                            </Button>
                                        )}
                                    </Box>
                                    <Button endIcon={<ArrowForwardRoundedIcon />}>
                                        @{EachAnswerer}
                                    </Button>
                                    <Button>
                                        @{QuestionAsker}
                                    </Button>
                                    <CardContent>
                                        <Typography>
                                            Created {CreatedDate} Updated {ModifiedDate}
                                        </Typography>
                                        <Typography variant="p">
                                            {Answer}
                                        </Typography>
                                    </CardContent>
                                </CardActions>
                            ) : (
                                <CardActions>
                                    <Box>
                                        {AcceptedAnswer.value === true ? (
                                            <Typography>Accepted Answer</Typography>
                                        ) : (
                                            <Typography>NOT Accepted</Typography>
                                        )}
                                    </Box>
                                    <Button endIcon={<ArrowForwardRoundedIcon />}>
                                        @{EachAnswerer}
                                    </Button>
                                    <Button>
                                        @{QuestionAsker}
                                    </Button>
                                    <CardContent>
                                        <Typography>
                                            Created {CreatedDate} Updated {ModifiedDate}
                                        </Typography>
                                        <Typography variant="p">
                                            {Answer}
                                        </Typography>
                                    </CardContent>
                                </CardActions>
                            )}
                        </ Box>
                    </Card>
                )
            })}
        </>
    )
}