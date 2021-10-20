import React from 'react';
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from '@mui/material';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles(({ theme }) => ({

}));
export default function JobDetails() {
    console.log()
    const classes = useStyles();
    return (
        <div className="marginAdjustment">
            <div className="background">
                <h1>Job Detail</h1>
            </div>
            <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
                <Card >
                    <DialogContent >
                        <h1>Job Details</h1>
                    </DialogContent>
                </Card>
            </Grid>
        </div>
    )
}