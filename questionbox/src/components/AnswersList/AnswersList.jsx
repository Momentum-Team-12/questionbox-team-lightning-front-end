import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'
import { Typography, Card, CardActions, CardContent, IconButton } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import axios from 'axios';


function AnswersList() {
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
                                @{AnswererUsername} <br></br> Asked {AnswerCreatedAt}
                            </Typography>
                            <Typography variant="h5">
                                {AnswerTitle}
                            </Typography>
                            <Typography variant="p">
                                {AnswerBody}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton aria-label="favorite this question">
                                <StarBorderOutlinedIcon color="primary" />
                            </IconButton>
                            <Typography>{TotalAnswers} favorites</Typography>
                        </CardActions>
                    </Card>
                )
            })}
        </>
    )

}

export default AnswersList



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

// export default function AnswersList() {
//     return (
//         <Card>
//             <CardContent>
//                 <Typography color="primary" gutterBottom>
//                     Word of the Day
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                     be{bull}nev{bull}o{bull}lent
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     adjective
//                 </Typography>
//                 <Typography variant="body2">
//                     well meaning and kindly.
//                     <br />
//                     {'"a benevolent smile"'}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Button size="small">Learn More</Button>
//             </CardActions>
//         </Card>
//     );
// }