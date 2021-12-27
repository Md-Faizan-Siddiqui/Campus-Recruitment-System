import "../App.css";
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import { ImOffice } from "react-icons/im";
import { GiSkills } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";
import DialogContent from '@material-ui/core/DialogContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CustomizedDialogs from "./modal"
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import fallBackImage from "../Images/images.png"
import cx from "classnames"
import { database } from "../Config/firebaseConfig"
import { userDetails } from "../Redux/Action/userAction";

const useStyles = makeStyles((theme) => ({
    root: {
        "&:first-child": {
            padding: "0",
        },
        padding: "0",
    },
    button: {
        margin: "10px 5px 0px 5px",
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "40%",
        marginBottom: "20px",
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
            paddingLeft: "0px",
        },
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
    appliedOrBlock: {
        borderRadius: "4px",
        padding: "0 10px",
        border: "1px solid #eaeff5",
        fontSize: "12px",
        lineHeight: "23px",
        textTransform: "uppercase",
        alignItems: "center",
        backgroundColor: "#a8b1e0",
        color: "#3f51b5",
        display: "flex",
        width: "17%",
        justifyContent: "center",
        position: "absolute",
        left: "0",
        boxSizing: "initial",
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
    },
    dtlButton: {
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "bold",
        backgroundColor: '#fff',
        color: '#3c52b2',
        display: "flex",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        alignItems: "center",
        '&:hover': {
            border: "2px solid #3c52b2",
            backgroundColor: '#3c52b2',
            color: '#fff',
            cursor: "pointer",
        },
    },
}));
export default function VacanciesCard({
    companyDetails,
    modal,
    campusData,
    jobDetail,
    btnText,
    deleteData,
    applyFunc,
    disableApply,
    disableFunc,
    companyPostJob,
    apply }) {

    const user = useSelector(state => state);
    const dispatch = useDispatch()
    const classes = useStyles();
    const student = user?.addUser?.loginUser?.role === "student";
    const company = user?.addUser?.loginUser?.role === "company";
    const admin = user?.addUser?.loginUser?.role === "admin";
    const allJobs = user.addUser.allJobs;
    const allUsers = user.addUser.allUsers;
    const allJobsKey = Object.keys(allJobs);
    const userId = campusData?.userId || campusData?.id

    const condition = campusData?.applicantUserId &&
        Object.values(campusData?.applicantUserId).find((item) => item?.id === user.addUser.loginUser.id)
    return (
        <Card style={{ margin: "10px", padding: "10px" }}>
            <DialogContent classes={{ root: classes.root }} className={jobDetail ? classes.dialogContent : ""}>
                <div className={jobDetail ? classes.firstChildJobDetails : ""}>
                    {jobDetail || modal ? null
                        :
                        <div className="jobTypeIcon" >
                            <div className="jobType">
                                <span>{campusData.jobType}</span>
                            </div>
                            {company ? null :
                                <div className="icon">
                                    <FavoriteIcon className={classes.colorFill} fontSize="small" />
                                </div>
                            }
                            {company ?
                                <div className={classes.dtlButton}
                                    onClick={deleteData ? deleteData : null}>
                                    <DeleteIcon fontSize="small" />
                                </div>
                                : null}
                        </div>
                    }
                    <div className="companyImg">
                        <div className="companyLogo">
                            <img src={allUsers[userId]?.fileToUpload || fallBackImage} alt="company logo" />
                        </div>
                        <div className="companyImg">
                            {jobDetail ?
                                <div className="jobTitle">
                                    <span><h4>{campusData.jobTitle}</h4></span>
                                </div> :
                                modal ? <div className="jobTitle">
                                    <span><h4>{campusData.name}</h4></span>
                                </div> :
                                    <h2>{campusData.jobTitle}</h2>
                            }
                            {modal ? null :
                                <p>{allUsers[userId]?.city}</p>
                            }
                        </div>
                    </div>
                    {jobDetail && (admin || company) ? null :
                        <div className="bottom">
                            {((!student && !modal && admin) || (student && jobDetail)) &&
                                <Button className={classes.button}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    disabled={disableApply && student}
                                    onClick={admin ? disableFunc
                                        : student ? applyFunc
                                            : null}
                                >
                                    {admin && campusData.block === true ? "Unblock"
                                        : admin && campusData.block === false ? "Block"
                                            : companyPostJob || jobDetail || apply ? btnText
                                                : null}</Button>
                            }
                            {jobDetail || modal ? null :
                                <Link to={"/jobdetails/" + campusData?.jobId} style={{ textDecoration: "none" }}>
                                    <Button
                                        className={classes.button}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                    >Details</Button>
                                </Link>
                            }
                            {modal || company && <CustomizedDialogs
                                appliedCandidate
                                campusData={campusData}
                                btnText="Applicants"
                                formTitle={"Applied Candidate's"} />}
                            {student && (condition || campusData.block) && !jobDetail ?
                                <div className={classes.appliedOrBlock}>
                                    <span>{condition ? "Applied!" : campusData?.block ? "Blocked!" : ""}</span>
                                </div>
                                : null}
                        </div>}
                </div>
                {jobDetail ?
                    <div className={cx(classes.className, classes.secondChild)}>
                        {companyDetails ?
                            <div className={classes.dataOrIcon}>
                                <ImOffice className={classes.icon} />
                                <p>{allUsers[userId]?.name}</p>
                            </div>
                            : null}
                        {companyDetails ?
                            <div className={classes.dataOrIcon}>
                                <MailOutlineIcon className={classes.icon} fontSize="small" />
                                <p>{allUsers[userId]?.email}</p>
                            </div>
                            : null}
                        {companyDetails ?
                            <div className={classes.dataOrIcon}>
                                <LanguageOutlinedIcon className={classes.icon} fontSize="small" />
                                <p>{allUsers[userId]?.website}</p>
                            </div>
                            : null}
                        {companyDetails ?
                            <div className={classes.dataOrIcon}>
                                <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                                <p>{allUsers[userId]?.phone}</p>
                            </div>
                            : null}
                        {campusData?.jobType ?
                            <div className={classes.dataOrIcon}>
                                <ScheduleIcon className={classes.icon} fontSize="small" />
                                <p>{campusData.jobType}</p>
                            </div>
                            : null}
                        {campusData?.experienceYears ?
                            <div className={classes.dataOrIcon}>
                                <GiSkills className={classes.icon} />
                                {campusData?.experienceYears && <p>{campusData?.experienceYears + " " + campusData?.experienceMonths}</p>}
                            </div>
                            : null}
                        {campusData?.salary ?
                            <div className={classes.dataOrIcon}>
                                <LocalAtmOutlinedIcon className={classes.icon} fontSize="small" />
                                <p>Rs. {campusData.salary}/=</p>
                            </div>
                            : null}
                        {campusData?.lastDate ?
                            <div className={classes.dataOrIcon}>
                                <DateRangeIcon className={classes.icon} fontSize="small" />
                                <p>{campusData.lastDate}</p>
                            </div>
                            : null}
                        {campusData?.education ?
                            <div className={classes.dataOrIcon}>
                                <FaGraduationCap className={classes.icon} fontSize="large" />
                                <p>{campusData.education}</p>
                            </div>
                            : null}
                    </div>
                    : null}

                {modal ? <div className={modal ? classes.className : classes.secondChild}>
                    {campusData?.email ?
                        <div className={classes.dataOrIcon}>
                            <MailOutlineIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.email}</p>
                        </div>
                        : null}
                    {campusData?.phone ?
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.phone}</p>
                        </div>
                        : null}
                    {campusData?.city ?
                        <div className={classes.dataOrIcon}>
                            <LocationOnOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.city}</p>
                        </div>
                        : null}
                    {campusData?.education ?
                        <div className={classes.dataOrIcon}>
                            <FaGraduationCap className={classes.icon} fontSize="large" />
                            <p>{campusData.education}</p>
                        </div>
                        : null}
                    {campusData?.skills ?
                        <div className={classes.dataOrIcon}>
                            <GiSkills className={classes.icon} fontSize="large" />
                            <p>{campusData.skills}</p>
                        </div>
                        : null}
                    {campusData?.dob ?
                        <div className={classes.dataOrIcon}>
                            <DateRangeIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.dob}</p>
                        </div>
                        : null}
                    {campusData?.experienceYears ?
                        <div className={classes.dataOrIcon}>
                            <WorkOutlineIcon className={classes.icon} fontSize="small" />
                            {campusData?.experienceYears && <p>{campusData?.experienceYears + " " + campusData?.experienceMonths}</p>}
                        </div>
                        : null}
                    {campusData?.cgpa ?
                        <div className={classes.dataOrIcon}>
                            <CalculateOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.cgpa}</p>
                        </div>
                        : null}
                </div> : null}
            </DialogContent>
        </Card>
    )
}