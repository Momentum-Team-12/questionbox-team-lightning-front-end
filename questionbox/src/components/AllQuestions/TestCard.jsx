import * as React from 'react';
// import './App.css'
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


export default function TestCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{ maxWidth: "97vw" }}>
            <Card>
                <CardHeader
                    subheader="@username . asked on this date . updated on this date"
                />
                <CardContent>
                    <Typography variant="h5" expand={expanded} onClick={handleExpandClick} sx={{ cursor: "pointer", userSelect: "none" }}>
                        Question Title
                    </Typography>
                    <Typography variant="p">
                        Question Body
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="favorite this question">
                        <StarBorderOutlinedIcon color="primary" />
                    </IconButton>
                    <Typography>Favorites</Typography>
                    <IconButton expand={expanded} onClick={handleExpandClick} aria-label="answer this question">
                        <InsertCommentIcon color="primary" />
                    </IconButton>
                    <Typography>Answers</Typography>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>5 answers to this question</Typography>
                        <Card>
                            <CardContent>
                                <Typography>
                                    The answer goes in here. Each answer is automatically populated in its own card element.
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
}
