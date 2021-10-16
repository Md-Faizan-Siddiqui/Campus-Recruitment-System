import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("sm")]: {
            padding: "0",
        },
    },
    // root: {
    //     [theme.breakpoints.down("sm")]: {
    //         padding: "0",
    //     }
    // },
    main: {
        display: "flex",
        justifyCcontent: "space-between"
    },
    mainChild: {
        display: "flex",
        alignItems: "center",
    },
    companyLogo: {
        width: "65px",
        height: "65px",
        margin: "10px 10px 10px 0",
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-block",
    }
}));
export default function VacanciesCard({ campusData }) {
    const classes = useStyles();
    return (
        <div>
            <Card style={{ margin: "10px", padding: "10px" }}>
                <DialogContent classes={{ root: classes.root }} >
                    <div className={classes.main}>
                        <div className={classes.mainChild}>
                            <div className={classes.companyLogo}>
                                <img src="https://1.bp.blogspot.com/-QEJHSCZ29Z8/XILObl4OjnI/AAAAAAAAIfo/eA1agAsDotIVQDHl9h7pJ9hnvLOHF2U8ACK4BGAYYCw/s1600/icon%2Bslack%2Bvector.png" alt="company logo" />
                            </div>
                            <div className="cName">
                                <h1>{campusData.name}</h1>
                                <span><h3>London, UK</h3></span>
                            </div>
                        </div>
                        <div className="icon">
                            <FavoriteBorderOutlinedIcon fontSize="small" />
                        </div>
                    </div>
                    <div className="cName">
                        <h2>Sr.Userexperience Designer</h2>
                        <span>$75k - $105k</span>
                    </div>
                    <div className="btnDiv">
                        <span className="selectTag">Full Time</span>
                        <span className="selectTag">Senior</span>
                        <span className="selectTag">UX/UI</span>
                    </div>
                </DialogContent>
                <div className="bottom">
                    <p>Posted: 2 day ago</p>
                    <Button size="small" variant="contained" color="primary">details</Button>
                </div>
            </Card>
        </div>
    )
}
