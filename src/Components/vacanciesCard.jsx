import "../App.css";
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import DialogContent from '@material-ui/core/DialogContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

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
        borderLeft: "1px solid black",
        width: "60%",
        paddingLeft: "20px",  
        [theme.breakpoints.down("sm")]: {
            borderLeft: "none",
            borderTop: "1px solid black",
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
    }
}));
export default function VacanciesCard({ campusData, jobDetail }) {
    console.log("Campus Data In Vacancies Card", campusData)
    const classes = useStyles({ jobDetail });
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
                    {console.log("cam daata", campusData)}
                    <div className="bottom">
                        <Link to={"/jobdetails/" + campusData?.jobId} style={{ textDecoration: "none" }}>
                            <Button className={classes.button}
                                size="small"
                                variant="outlined"
                                color="primary"
                            >apply now</Button>
                        </Link>
                    </div>
                </div>
                {jobDetail ?
                    <div className={classes.secondChild}>
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.phone}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.lastDate}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.salary}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.website}</p>
                        </div>
                        <div className={classes.dataOrIcon}>
                            <PhoneIphoneOutlinedIcon className={classes.icon} fontSize="small" />
                            <p>{campusData.jobType}</p>
                        </div>
                        
                    </div>
                    : null}
            </DialogContent>
        </Card>
    )
}