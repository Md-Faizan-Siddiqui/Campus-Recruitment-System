import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@material-ui/core';

export default function GroupedSelect() {
    return (
        <div>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <FormControl sx={{ width: 1 }} >
                        <InputLabel htmlFor="grouped-select">Experience</InputLabel>
                        <Select
                            defaultValue=""
                            id="grouped-native-select"
                            label="Experience"
                            placeholder="Experience"
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
