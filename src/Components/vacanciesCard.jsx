import "../App.css";
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import DialogContent from '@material-ui/core/DialogContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import { ImOffice } from "react-icons/im";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { GiSkills } from "react-icons/gi";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import { FaGraduationCap } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    root: {
        "&:first-child": {
            padding: "0",
        },
        padding: "0",
    },
    button: {
        padding: "8px 15px",
        fontSize: "12px",
        fontWeight: "bold",
        color: "#26ae61",
        borderColor: "#3c52b2",
        border: "2px solid",
        backgroundColor: '#fff',
        color: '#3c52b2',
        '&:hover': {
            borderColor: "#3c52b2",
            border: "2px solid",
            backgroundColor: '#3c52b2',
            color: '#fff',
        },
    },
    colorFill: {
        color: "#ffff",
        '&:hover': {
            color: "red"
        },
    },
    firstChild: {
        // border: "1px solid black",
    },
    firstChildJobDetails: {
        width: "40%",
        marginBottom: "5px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    secondChild: {
        borderLeft: "1px solid #eaeff5",
        width: "60%",
        paddingLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            borderLeft: "none",
            borderTop: "1px solid #eaeff5",
            paddingTop: "20px",
            width: "100%",
            boxSizing: "border-box",
        },
    },
    secondChildDetail: {

    },
    dialogContent: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        },
    },
    icon: {
        color: '#1976d2',
        marginTop: "3px",
        marginRight: "10px",
    },
    dataOrIcon: {
        fontWeight: "bold",
        display: "flex",
        lineHeight: "30px",
        alignItems: "center",
        "&:nth-child(1)": {
            color: "#707f8c",
        },
        "&:nth-child(2)": {
            color: "#707f8c",
        },
        "&:nth-child(3)": {
            color: "#707f8c",
        },
        "&:nth-child(4)": {
            color: "#707f8c",
        },
        "&:nth-child(5)": {
            color: "#707f8c",
        },
        "&:nth-child(6)": {
            color: "#707f8c",
        },
        "&:nth-child(7)": {
            color: "#707f8c",
        },
        "&:nth-child(8)": {
            color: "#707f8c",
        },
        "&:nth-child(9)": {
            color: "#707f8c",
        },
    }
}));
export default function VacanciesCard({ campusData, jobDetail, role, btnText, deleteData }) {
    console.log("Campus Data In Vacancies Card", jobDetail, role)
    const classes = useStyles();
    return (
        <Card style={{ margin: "10px", padding: "10px" }}>
            <DialogContent classes={{ root: classes.root }} className={jobDetail ? classes.dialogContent : ""}>
                <div className={jobDetail ? classes.firstChildJobDetails : classes.firstChild}>
                    {jobDetail ? null
                        :
                        <div className="jobTypeIcon" >
                            <div className="jobType">
                                <span>{campusData.jobType}</span>
                            </div>
                            <div className="icon">
                                <FavoriteIcon className={classes.colorFill} fontSize="small" />
                            </div>
                        </div>
                    }
                    <div className="companyImg">
                        <div className="companyLogo">
                            <img src={campusData.companyLogo} alt="company logo" />
                        </div>
                        <div className="companyImg">
                            {jobDetail ?
                                <div className="jobTitle">
                                    <span><h4>{campusData.jobTitle}</h4></span>
                                </div> :
                                <h2>{campusData.jobTitle}</h2>
                            }
                            <p>{campusData.city}</p>
                        </div>
                    </div>
                    {/* {console.log("cam daata", campusData)} */}
                    {jobDetail && role === "company" ? null :
                        <div className="bottom">
                            <Link to={"/jobdetails/" + campusData?.jobId} style={{ textDecoration: "none" }}>
                                <Button className={classes.button}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                >{role === "company" ? "Details" : "apply now"}</Button>
                            </Link>
                        </div>}
                    {role === "company" && !jobDetail ?
                        <div className="bottom">
                            <Button
                                className={classes.button}
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={deleteData}>
                                {btnText}</Button>
                        </div>
                        : null}
                </div>
                {jobDetail ?
                    <div className={classes.secondChild}>
                        <div className={classes.dataOrIcon}>
                            <ImOffice className={classes.icon} />
                            <p>{campusData.name}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <MailOutlineIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.email}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.phone}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <ScheduleIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.jobType}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <GiSkills className={classes.icon} />
                            <p>{campusData.experience}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <LanguageOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.website}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <LocalAtmOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>Rs. {campusData.salary}/=</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <DateRangeIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.lastDate}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <FaGraduationCap className={classes.icon} fontSize="large" />
                            <p>{campusData.education}</p>
                        </div>
                        {/* <div className={classes.dataOrIcon}>
                            <LocationOnOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.city}</p>
                        </div> */}
                    </div>
                    : null}
            </DialogContent>
        </Card>
    )
}