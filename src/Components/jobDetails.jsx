import React from 'react';
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from '@mui/material';
import DialogContent from '@material-ui/core/DialogContent';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import VacanciesCard from './vacanciesCard';

const useStyles = makeStyles(({ theme }) => ({
    root: {
        margin: 10,
    }
}));
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function JobDetails(props) {
    const jobs = useSelector(state => state.addUser.allJobs)
    console.log("Data in Job", Object.values(jobs).map(item => Object.values(item).flat(1)).flat(1))
    const allJobsArr = Object.values(jobs).map(item => Object.values(item).flat(1)).flat(1)
    console.log("All Jobs Arr", allJobsArr)
    const jobDetail = allJobsArr?.find(item => item.jobId === +props.match.params.id) || {}

    // const jobDetail = Object.values(jobs)?.filter(
    //     (jobData) => Object.keys(jobData)?.filter(item => item === props.match.params.id).length
    // );
    console.log("Data in Job Details", jobDetail)
    // const history = useHistory()
    console.log(props.match.params, "hs")
    const classes = useStyles();
    return (
        <div className="marginAdjustment">
            <div className="background">
                <h1>Job Detail</h1>
            </div>
            <Grid container>
                <Grid item xl={6} lg={7} md={6} sm={6} xs={6}>
                    <VacanciesCard 
                    campusData={jobDetail}
                    jobDetail />
                    <Card className={classes.root}>
                        <DialogContent >
                            <h1>Job Details</h1>
                        </DialogContent>
                    </Card>
                </Grid>
                <Grid item xl={6} lg={5} md={6} sm={6} xs={6}>
                    <Card className={classes.root} >
                        <DialogContent >
                            <h1>Job Details</h1>
                        </DialogContent>
                    </Card>
                </Grid>
                <Grid item xl={6} lg={7} md={6} sm={6} xs={6}>
                    <Card className={classes.root} >
                        <DialogContent >
                            <h1>Job Details</h1>
                        </DialogContent>
                    </Card>
                </Grid>
                <Grid item xl={6} lg={5} md={6} sm={6} xs={6}>
                    <Card className={classes.root} >
                        <DialogContent >
                            <h1>Job Details</h1>
                        </DialogContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}