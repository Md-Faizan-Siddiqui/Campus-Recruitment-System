import "../App.css";
import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import DialogContent from '@material-ui/core/DialogContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import { ImOffice } from "react-icons/im";
import { GiSkills } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";
import CustomizedDialogs from "./modal"

const useStyles = makeStyles((theme) => ({
    root: {
        "&:first-child": {
            padding: "0",
        },
        padding: "0",
    },
    button: {
        margin: "10px",
        padding: "8px 15px",
        fontSize: "12px",
        fontWeight: "bold",
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
export default function VacanciesCard({
    campusData,
    jobDetail,
    role,
    btnText,
    deleteData,
    applyFunc,
    disableApply,
    disableFunc,
    companyPostJob,
    apply }) {
    const user = useSelector(state => state);
    const classes = useStyles();
    const student = user?.addUser?.loginUser?.role === "student";
    const company = user?.addUser?.loginUser?.role === "company";
    const admin = user?.addUser?.loginUser?.role === "admin";
    return (
        <Card style={{ margin: "10px", padding: "10px" }}>
            <DialogContent classes={{ root: classes.root }} className={jobDetail ? classes.dialogContent : ""}>
                <div className={jobDetail ? classes.firstChildJobDetails : ""}>
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
                    {jobDetail && (admin || company) ? null :
                        <div className="bottom">
                            {((!student && (company || admin)) || (student && jobDetail)) &&
                                <Button className={classes.button}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    disabled={disableApply && student}
                                    onClick={deleteData ? deleteData
                                        : admin ? disableFunc
                                            : student ? applyFunc
                                                : null}
                                >
                                    {admin && campusData.block === true ? "Unblock"
                                        : admin && campusData.block === false ? "Block"
                                            : companyPostJob || jobDetail || apply ? btnText
                                                : null}</Button>
                            }
                            {jobDetail ? null :
                                <Link to={"/jobdetails/" + campusData?.jobId} style={{ textDecoration: "none" }}>
                                    <Button
                                        className={classes.button}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        >Details</Button>
                                </Link>
                            }
                            {company && <CustomizedDialogs 
                            appliedCandidate
                            campusData={campusData}
                            btnText="Applicants"
                            formTitle={"Applied Candidate's"}/>}
                        </div>}
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
                    </div>
                    : null}
            </DialogContent>
        </Card>
    )
}