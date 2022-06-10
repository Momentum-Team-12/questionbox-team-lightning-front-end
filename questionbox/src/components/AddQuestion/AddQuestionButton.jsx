import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create';

export default function AddQuestionButton({ token, username, isLoggedIn }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const buttonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  if (!isLoggedIn) {
    return (
      <Box>
        <Fab variant="extended"
          style={buttonStyle}
          onClick={handleClick}
          component={Link}
          to="/signin"
          color="secondary"
          aria-label="add">
          <CreateIcon />
          Add Question
        </Fab>
      </Box>
    )
  }
  return (
    <Box>
      <Fab variant="extended"
        style={buttonStyle}
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