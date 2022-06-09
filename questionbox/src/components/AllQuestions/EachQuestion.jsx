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
import Typography from '@mui/material/Typography';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import axios from 'axios';


export default function TestCard({eachQuestion, index}) {
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

    return (
        <Box sx={{ maxWidth: "97vw" }}>
            <Card key={index}>
                <Typography variant="p">
                    @{QuestionAsker} . {CreatedDate} . {ModifiedDate}
                </Typography>
                <CardContent>
                    <Typography variant="h5" expand={expanded} onClick={handleExpandClick} sx={{ cursor: "pointer", userSelect: "none" }}>
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
                    <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
                        <InsertCommentIcon color="primary" />
                    </IconButton>
                    <Typography>{Answers}</Typography>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>{Answers} answers to this question</Typography>
                        <Card>
                            <CardContent>
                                <Typography>
                                    we need to map through all the answers to a specific question as they are in their own array. The answer goes in here. Each answer is automatically populated in its own card element.
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
            )
}
