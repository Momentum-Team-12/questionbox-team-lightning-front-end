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
import EachQuestion from './EachQuestion';



export default function EachAnswerForQuestion({index}) {
    const [allAnswers, setAllAnswers] = useState([])


    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/${index}/answers`)
            .then((res) => {
                console.log(res.data)
                setAllAnswers(res.data)
            })
    }, [])

    return (
        <>
        {allAnswers.map((eachAnswer, index) => {
                const Answer = eachAnswer.response
                const EachAnswerer = eachAnswer.responder
                const CreatedDate = eachAnswer.created_at
                const ModifiedDate = eachAnswer.modified_on
        return (
            <Card key={index}>
            <Typography variant="p">
                    @{EachAnswerer} . {CreatedDate} . {ModifiedDate}
                </Typography>
                <CardContent>
                    <Typography variant="p">
                        {Answer}
                    </Typography>
                </CardContent>
        </Card>
            )
        })}
        </>
    )
}