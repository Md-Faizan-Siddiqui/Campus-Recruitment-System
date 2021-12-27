// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import TagFacesIcon from '@mui/icons-material/TagFaces';

// const ListItem = styled('li')(({ theme }) => ({
//     margin: theme.spacing(0.5),
// }));

// export default function ChipsArray() {
//     const [chipData, setChipData] = React.useState([
//         { key: 0, label: 'Angular' },
//         { key: 1, label: 'jQuery' },
//         { key: 2, label: 'Polymer' },
//         { key: 3, label: 'React' },
//         { key: 4, label: 'Vue.js' },
//     ]);
//     const [input, setInput] = React.useState("");

//     const handleDelete = (chipToDelete) => () => {
//         setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
//     };
//     console.log("Input Data",input)

//     const handleInput = (e) => {
//         if (e.key === "Enter") {
//             setInput(e.target.value)
//             console.log("e", e.key, e.target.value)

//         }
//     }
//     return (
//         <Box>
//             {/* <TextField 
//             label="Abc"
//             name="abc"
//             value={input}
//             onchange={(e)=>setInput(e.target.value)}
//             /> */}
//             <TextField
//                 label="Skills"
//                 placeholder="Skills"
//                 fullWidth
//                 margin="normal"
//                 //   InputLabelProps={{
//                 //     shrink: true,
//                 //   }}
//                 variant="outlined"
//                 name="skills"
//                 //   value={input}
//                 // onchange={(e)=>setInput(e.target.value)}
//                 onKeyPress={(e) => handleInput(e)}
//             />
//             <Paper
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'start',
//                     flexWrap: 'wrap',
//                     listStyle: 'none',
//                     p: 0.5,
//                     m: 0,
//                 }}
//                 component="ul"
//             >
//                 {chipData.map((data) => {
//                     let icon;

//                     return (
//                         <ListItem key={data.key}
//                             variant="outlined">
//                             <Chip
//                                 variant='outlined'
//                                 icon={icon}
//                                 label={data.label}
//                                 onDelete={() => handleDelete(data)}
//                             />
//                         </ListItem>
//                     );
//                 })}
//             </Paper>
//         </Box>
//     );
// }

