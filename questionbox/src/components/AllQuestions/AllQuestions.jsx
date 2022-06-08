import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'
import { Typography, Card, CardActions, CardContent, IconButton } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import axios from 'axios';


function AllQuestions() {
    const [allQuestions, setAllQuestions] = useState([])

    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
            .then((res) => {
                console.log(res.data)
                setAllQuestions(res.data)
            })
    }, [])

    return (
        <>
            {allQuestions.map((eachQuestion, index) => {
                const QuestionAsker = eachQuestion.creator
                const QuestionTitle = eachQuestion.title
                const QuestionBody = eachQuestion.body
                const TotalQuestions = eachQuestion.total_Questions
                const QuestionCreatedAt = eachQuestion.created_at
                return (
                    <Card key={index}>
                        <CardContent>
                            <Typography gutterBottom>
                                @{QuestionAsker} <br></br> Asked {QuestionCreatedAt}
                            </Typography>
                            <Typography variant="h5">
                                {QuestionTitle}
                            </Typography>
                            <Typography variant="p">
                                {QuestionBody}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton aria-label="favorite this question">
                                <StarBorderOutlinedIcon color="primary" />
                            </IconButton>
                            <Typography>{TotalQuestions} favorites</Typography>
                        </CardActions>
                    </Card>
                )
            })}
        </>
    )

}

export default AllQuestions