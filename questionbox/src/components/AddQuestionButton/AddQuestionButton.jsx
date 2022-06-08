import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export default function AddQuestionButton(props) {
  if (!props.isLoggedIn) {
    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab component={Link} to="/login" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    )
  }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab
        component={Link}
        to="/questions/add"
        color="secondary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
