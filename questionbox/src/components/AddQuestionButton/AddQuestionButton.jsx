import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const buttonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

export default function AddQuestionButton() {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab component={Link} to="/questions/add" color="secondary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
    );
}

// export default function AddQuestionButton(isLoggedIn) {
//     {
//         !isLoggedIn ? (
//         return (
//             <Box sx={{ '& > :not(style)': { m: 1 } }}>
//                 <Fab component={Link} to="/login" color="secondary" aria-label="add">
//                     <AddIcon />
//                 </Fab>
//             </Box>)
//         ) : (
//         return (
//             <Box sx={{ '& > :not(style)': { m: 1 } }}>
//                 <Fab component={Link} to="/questions/add" color="secondary" aria-label="add">
//                     <AddIcon />
//                 </Fab>
//             </Box>
//         )))
//     }

// }