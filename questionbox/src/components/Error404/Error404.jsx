import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, Box, Typography, Button, Card, CardActions, CardContent } from '@mui/material'
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';

const cardStyle = {
    display: "block",
    height: "100vh",
    backgroundColor: "#f35d64",
};

export default function Error404() {

    return (
        <Card style={cardStyle}>
            <CardContent align="center" justify="center">
                <Icon icon="mdi:alien" width="20vw" />
                <Typography variant="h1">
                    404
                </Typography>
                <Typography variant="h5">
                    you seem to be lost!
                </Typography>
                <Box textAlign="center">
                    <IconButton component={Link} to="/"
                        size="large" color="inherit">
                        <PublicIcon size="large" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card >
    )
}