import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import JobDetails from "./jobDetails"
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { userDetails } from "../Redux/Action/userAction";

const useStyles = makeStyles(({ theme }) => ({
    root: {
        "&:first-child": {
            padding: "0",
        },
        padding: "0",
    },
    button: {
        // textDecoration: "none",
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
    }
}));
export default function VacanciesCard({ campusData, jobDetail }) {
    // const dispatch = useDispatch();
    console.log("Campus Data In Vacancies Card", campusData)
    const classes = useStyles();
    return (
        <Card style={{ margin: "10px", padding: "10px" }}>
            <DialogContent classes={{ root: classes.root }} >
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
                <Link to={"/jobdetails/" + campusData?.jobId} style={{ textDecoration: "none" }}>
                    <div className="bottom">
                        <Button className={classes.button}
                            size="small"
                            variant="outlined"
                            color="primary"
                        >apply now</Button>
                    </div>
                </Link>
            </DialogContent>
        </Card>
    )
}