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
import ScheduleIcon from '@mui/icons-material/Schedule';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
    },
    scheduleIconDiv: {
        border: "1px solid #3f51b5",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20px",
        color: "#ffff",
        backgroundColor: "#3f51b5",
    },
    main: {
        borderBottom: "1px solid #eaeff5",
        display: "flex",
        alignItems: "center",
        padding: "0px 20px",
    },
    openingHour: {
        color: "#334e6f",
        fontWeight: 600,
        [theme.breakpoints.down("md")]: {
            fontSize: "18px",
            color: "#334e6f",
            fontWeight: 600,
        },
    },
    timing: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px dotted #eaeff5",
        padding: "15px 10px",
        color: "#707f8c",
        fontWeight: 600,
    },
    last: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 10px",
        color: "#707f8c",
        fontWeight: 600,
    },
    descriptionHeader: {
        border: "1px solid #3f51b5",
        margin: "-20px -24px  0px -24px",
        color: "#ffff",
        backgroundColor: "#3f51b5",
        padding: "20px 20px 20px 25px",
        borderRadius: "6px 6px 0px 0px ",
        fontSize: "18px",
    },
    description: {
        margin: "20px 0",
    },
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

    console.log("Data in Job Details", jobDetail)
    console.log(props.match.params, "hs")
    const classes = useStyles();
    return (
        <div className="marginAdjustment">
            <div className="background">
                <h1>Job Detail</h1>
            </div>
            <Grid container>
                <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
                    <VacanciesCard
                        campusData={jobDetail}
                        jobDetail
                        lg={3} />
                    <Card className={classes.root} >
                        <DialogContent >
                            <div className={classes.descriptionHeader}>
                                <span>Job Description</span>
                            </div>
                            <div className={classes.description}>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                                    looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                                    of letters, as opposed to using 'Content here, content here', making it look like readable English.
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
                                    and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions
                                    have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            </div>
                        </DialogContent>
                    </Card>
                </Grid>

                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <Card className={classes.root}>
                        <DialogContent >
                            <div className={classes.main}>
                                <div className={classes.scheduleIconDiv}><ScheduleIcon className={classes.scheduleIcon} fontSize="medium" /></div>
                                <div><h2 className={classes.openingHour}>Opening Hours</h2></div>
                            </div>
                            <div className={classes.timing}>
                                <div>Monday</div>
                                <div>9 AM - 5 PM</div>
                            </div>
                            <div className={classes.timing}>
                                <div>Tuesday</div>
                                <div>9 AM - 5 PM</div>
                            </div>
                            <div className={classes.timing}>
                                <div>Wednesday</div>
                                <div>9 AM - 5 PM</div>
                            </div>
                            <div className={classes.timing}>
                                <div>Thursday</div>
                                <div>9 AM - 5 PM</div>
                            </div>
                            <div className={classes.timing}>
                                <div>Friday</div>
                                <div>9 AM - 5 PM</div>
                            </div>
                            <div className={classes.timing}>
                                <div>Saturday</div>
                                <div>9 AM - 3 PM</div>
                            </div>
                            <div className={classes.last}>
                                <div>Sunday</div>
                                <div>Closed</div>
                            </div>
                        </DialogContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}