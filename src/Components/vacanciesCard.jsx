import "../App.css";
import { Button } from '@material-ui/core';
import { Card } from '@mui/material';
import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DialogContent from '@material-ui/core/DialogContent';

export default function VacanciesCard({ campusData }) {
    return (
        <div>
            <Card style={{ margin: "10px", padding: "10px" }}>
                <DialogContent >
                    <div className="main">
                        <div className="mainChild">
                            <div className="companyLogo">
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