import React from 'react';
import "../Style/userProfileCard.css";
import fallBackImage from "../Images/images.png";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from '@material-ui/core';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { GiSkills } from "react-icons/gi";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
// import HttpIcon from '@mui/icons-material/Http';
import LanguageIcon from '@mui/icons-material/Language';

const useStyles = makeStyles({
    root: {
        margin: 10,
    },
});

function UserProfileCard({ campusData }) {
    const classes = useStyles();
    return (
        <Grid container className="grid">
            <Grid item xl={8} lg={5} md={6} sm={8} xs={12} >
                <Card className={classes.root} style={{ padding: "0 30px 30px 30px", marginTop: "100px" }}>

                    <div className="pImgDiv">
                        <img src={campusData?.fileToUpload
                            ? campusData.fileToUpload
                            : fallBackImage} alt="" />
                    </div>
                    <div className="pInfoDiv">

                        <h1>{campusData.name}</h1>
                        <h4>MERN Stack Developer</h4>

                        <div className="iconDiv">
                            <LocationOnOutlinedIcon color="primary" fontSize="small" />
                            <p>Karachi, Pakistan</p>
                        </div>
                    </div>

                    <div className="detailsMain">
                        <div className="iconOrData">
                            <EmailOutlinedIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.email}</p>
                        </div>

                        <div className="iconOrData">
                            <PhoneIphoneOutlinedIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.phone}</p>
                        </div>

                        <div className="iconOrData">
                            <DateRangeOutlinedIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.dob}</p>
                        </div>

                        <div className="iconOrData">
                            <CalculateOutlinedIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.cgpa}</p>
                        </div>

                        <div className="iconOrData">
                            <GiSkills fontSize="large" style={{ color: '#1976d2', marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.skills}</p>
                        </div>

                        <div className="iconOrData">
                            <WorkOutlineIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.experience}</p>
                        </div>

                        <div className="iconOrData">
                            <CastForEducationOutlinedIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.education}</p>
                        </div>

                        <div className="iconOrData">
                            <LanguageIcon color="primary" fontSize="small" style={{ marginTop: "3px", marginRight: "10px" }} />
                            <p>{campusData.website}</p>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "Center" }}>
                        <div style={{ margin: "20px" }}>
                            <FacebookOutlinedIcon color="#3b5998" />
                        </div>
                        <div style={{ margin: "20px" }}>
                            <GitHubIcon color="#3b5998" />
                        </div>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserProfileCard