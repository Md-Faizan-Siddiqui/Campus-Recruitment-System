import "../App.css";
import React, { useState } from 'react';
import { database } from "../Config/firebaseConfig";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import DialogContent from '@material-ui/core/DialogContent';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Paper from '@mui/material/Paper';
import VacanciesCard from './vacanciesCard';
import Alert from "../Components/snackBar"

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
        padding: "0px 20px 10px 20px",
        [theme.breakpoints.down("sm")]: {
            padding: "0px 0px 10px 0px",

        },
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
        color: "#707f8c",
    },
}));
 styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function JobDetails(props) {
    const [alert, setAlert] = useState(false)
    const classes = useStyles();
    const user = useSelector(state => state.addUser)
    const jobs = user.allJobs;
    const allJobsArr = Object.values(jobs).map(item => Object.values(item).flat(1)).flat(1)
    const jobDetail = allJobsArr?.find(item => item.jobId === +props.match.params.id) || {}
    const companyDetails= user.cUserDetails;

    const applyFunc = ({ jobId, userId }) => {
        database
            .ref(`/CRA/jobs/${userId}/${jobId}/applicantUserId`)
            .push({
                id: user.loginUser.id,
            })
            .then(() => {
                setAlert(true)
            })
            .catch(() => {
            });
    };

    const condition = jobDetail?.applicantUserId &&
        Object.values(jobDetail?.applicantUserId).find((item) => item?.id === user.loginUser.id)
    return (
        <div className="marginAdjustment">
            <div className="background">
                <h1>Job Detail</h1>
            </div>
            <Grid container>
                <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
                    <VacanciesCard
                    companyDetails={companyDetails}
                        campusData={jobDetail}
                        jobDetail
                        block={jobDetail.block}
                        btnText={
                            jobDetail?.block
                                ? "Blocked"
                                : condition
                                    ? "Applied"
                                    : "Apply Now"
                        }
                        disableApply={
                            jobDetail?.block ||
                            condition
                        }
                        applyFunc={() =>
                            applyFunc({
                                jobId: jobDetail.jobId,
                                userId: jobDetail.userId,
                            })
                        }
                    />
                    <Card className={classes.root} >
                        <DialogContent >
                            <div className={classes.descriptionHeader}>
                                <span>Job Description</span>
                            </div>
                            <div className={classes.description}>
                                <p>{jobDetail.jobDescription}</p>
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
            {alert ?
                <Alert setAlert={setAlert} message={"Sucessfully Applied"} errMessage={"Unexpected Error"} />
                : null}
        </div>
    )
}