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
        // width: "100%",
    },
});

export default function GroupedSelect() {
    const classes = useStyles()
    return (
        <div>
            <Grid container>
                {/* <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                    <FormControl sx={{ width: 1 }} classes={{ root: classes.root }}>
                        <InputLabel htmlFor="grouped-native-select">Experience</InputLabel>
                        <Select
                            native
                            defaultValue=""
                            id="grouped-native-select"
                            label="Experience"
                            variant="outlined"
                            placeholder="Experience"
                            // fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="experience"
                        // value={formik.values.experience}
                        // onChange={formik.handleChange("experience")}
                        >
                            <option aria-label="None" value="" />
                            <optgroup label="Category 1">
                                <option value={1}>1 Year</option>
                                <option value={2}>2 Years</option>
                                <option value={3}>3 Years</option>
                                <option value={4}>4 Years</option>
                                <option value={5}>5 Years</option>
                                <option value={6}>6 Years</option>
                                <option value={7}>7 Years</option>
                                <option value={8}>8 Years</option>
                                <option value={9}>9 Years</option>
                                <option value={10}>10 Years</option>
                            </optgroup>
                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <FormControl sx={{ width: 1 }} >
                        <InputLabel htmlFor="grouped-select">Experience</InputLabel>
                        <Select
                            defaultValue=""
                            id="grouped-native-select"
                            label="Experience"
                            placeholder="Experience"
                        // margin="normal"
                        // variant="outlined"
                        // name="experience"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        >
                            <MenuItem value="Fresh">Fresh</MenuItem>
                            <MenuItem value={1}>1 Year</MenuItem>
                            <MenuItem value={2}>2 Years</MenuItem>
                            <MenuItem value={3}>3 Years</MenuItem>
                            <MenuItem value={4}>4 Years</MenuItem>
                            <MenuItem value={5}>5 Years</MenuItem>
                            <MenuItem value={6}>6 Years</MenuItem>
                            <MenuItem value={7}>7 Years</MenuItem>
                            <MenuItem value={8}>8 Years</MenuItem>
                            <MenuItem value={9}>9 Years</MenuItem>
                            <MenuItem value={10}>10 Years</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <FormControl sx={{ width: 1 }} >
                        <InputLabel htmlFor="grouped-select">Experience</InputLabel>
                        <Select
                            defaultValue=""
                            id="grouped-select"
                            label="Experience"
                            placeholder="Experience"
                        // margin="normal"
                        // variant="outlined"
                        // name="experience"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={1}>1 Month</MenuItem>
                            <MenuItem value={2}>2 Months</MenuItem>
                            <MenuItem value={3}>3 Months</MenuItem>
                            <MenuItem value={4}>4 Months</MenuItem>
                            <MenuItem value={5}>5 Months</MenuItem>
                            <MenuItem value={6}>6 Months</MenuItem>
                            <MenuItem value={7}>7 Months</MenuItem>
                            <MenuItem value={8}>8 Months</MenuItem>
                            <MenuItem value={9}>9 Months</MenuItem>
                            <MenuItem value={10}>10 Months</MenuItem>
                            <MenuItem value={11}>11 Months</MenuItem>
                            <MenuItem value={12}>12 Months</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div >
    );
}
