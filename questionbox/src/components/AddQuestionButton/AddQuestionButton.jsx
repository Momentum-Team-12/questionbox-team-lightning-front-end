import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create';

export default function AddQuestionButton(props) {

const buttonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  if (!props.isLoggedIn) {
    return (
      <Box>
        <Fab variant="extended"
          style={style}
          component={Link}
          to="/login"
          color="secondary"
          aria-label="add">
          <CreateIcon />
          Add
        </Fab>
      </Box>
    )
  }
  return (
    <Box>
      <Fab variant="extended"
        style={style}
        component={Link}
        to="/questions/add"
        color="secondary"
        aria-label="add"
      >
        <CreateIcon />
        Add
      </Fab>
    </Box>
  )
}
