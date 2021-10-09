import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

export default function GroupedSelect() {
    const classes = useStyles()
    return (
        <div>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                    <FormControl sx={{ width: 1 }} classes={{ root: classes.root }}>
                        <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select" label="Grouping">
                            <option aria-label="None" value="" />
                            <optgroup label="Category 1">
                                <option value={1}>Option 1</option>
                                <option value={2}>Option 2</option>
                            </optgroup>
                            <optgroup label="Category 2">
                                <option value={3}>Option 3</option>
                                <option value={4}>Option 4</option>
                            </optgroup>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <FormControl sx={{}} classes={{ root: classes.root }}>
                        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                        <Select defaultValue="" id="grouped-select" label="Grouping">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem value={1}>Option 1</MenuItem>
                            <MenuItem value={2}>Option 2</MenuItem>
                            <ListSubheader>Category 2</ListSubheader>
                            <MenuItem value={3}>Option 3</MenuItem>
                            <MenuItem value={4}>Option 4</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}
