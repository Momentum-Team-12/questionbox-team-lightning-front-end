import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, Box, Typography, Button, Card, CardActions, CardContent } from '@mui/material'
import { Icon } from '@iconify/react';
import { Navigate } from 'react-router-dom'

export default function Error404() {
    return (
        <Card>
            <CardContent align="center" justify="center">
                <Icon icon="mdi:alien" width="20vw" />
                <Typography variant="h1">
                    404
                </Typography>
                <Typography variant="h5">
                    you seem to be lost!
                </Typography>
                <Typography variant="p">
                    Error404
                </Typography>
                <Box textAlign="center">
                    <Button size="large" navigate="/" >Sign in</Button>
                </Box>
            </CardContent>
        </Card >
    )
}