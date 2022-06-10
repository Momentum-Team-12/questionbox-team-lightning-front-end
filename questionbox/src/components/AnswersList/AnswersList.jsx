import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react'
import { Typography, Card, CardActions, CardContent, IconButton, Divider } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import axios from 'axios';


function AnswersList({ isLoggedIn }) {
    const [allAnswers, setAllAnswers] = useState([])

    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
            .then((res) => {
                console.log(res.data)
                setAllAnswers(res.data)
            })
    }, [])

    return (
        <>
            {allAnswers.map((eachAnswer, index) => {
                const AnswererUsername = eachAnswer.creator
                const AnswerTitle = eachAnswer.title
                const AnswerBody = eachAnswer.body
                const TotalAnswers = eachAnswer.total_answers
                const AnswerCreatedAt = eachAnswer.created_at
                return (
                    <Card key={index}>
                        <CardContent>
                            <Typography gutterBottom>
                                @{AnswererUsername}
                            </Typography>
                            <Typography>
                                Asked {AnswerCreatedAt}
                            </Typography>
                            <Typography variant="h5">
                                {AnswerTitle}
                            </Typography>
                            <Typography variant="p">
                                {AnswerBody}
                            </Typography>
                        </CardContent>
                        {!isLoggedIn ? (
                            <CardActions>
                                <Typography>{TotalAnswers} favorites</Typography>
                                <Divider variant="middle" />
                                <Typography variant="p">Log in to favorite</Typography>
                            </CardActions>
                        ) : (
                            <CardActions>
                                <IconButton aria-label="favorite this question">
                                    <StarBorderOutlinedIcon color="primary" />
                                </IconButton>
                                <Typography>{TotalAnswers} favorites</Typography>
                            </CardActions>
                        )}
                    </Card>
                )
            })}
        </>
    )

}

export default AnswersList