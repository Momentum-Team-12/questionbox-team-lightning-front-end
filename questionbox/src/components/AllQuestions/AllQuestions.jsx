import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'
import { Typography, Card, CardActions, CardContent, IconButton } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
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
                const Favorites = eachQuestion.favorite_count
                const Answers = eachQuestion.total_answers
                const CreatedDate = eachQuestion.created_at
                const ModifiedDate = eachQuestion.modified_on
                return (
                    <Box>
                        <Card key={index}>
                            <CardContent>
                                <Typography gutterBottom>
                                    @{QuestionAsker} <br></br> Asked {CreatedDate}
                                </Typography>
                                <Typography>
                                    Updated {ModifiedDate}
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
                                <Typography>{Favorites}</Typography>
                                <IconButton aria-label="answer this question">
                                    <InsertCommentIcon color="primary" />
                                </IconButton>
                                <Typography>{Answers}</Typography>
                            </CardActions>
                        </Card>
                    </Box>
                )
            })}
        </>
    )

}

export default AllQuestions