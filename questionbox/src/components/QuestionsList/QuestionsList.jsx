import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
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
import EachQuestion from './EachQuestion'


export default function QuestionsList({ isLoggedIn, username, token }) {
    const [allQuestions, setAllQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
            .then((res) => {
                console.log(res.data)
                setAllQuestions(res.data)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <Box>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            {allQuestions.map((eachQuestion, index) => {
                return (
                    <Box sx={{ maxWidth: "97vw" }} key={index}>
                        <EachQuestion eachQuestion={eachQuestion} index={index} isLoggedIn={isLoggedIn} username={username} token={token} />
                    </Box>
                )
            })}
        </>
    )
}
