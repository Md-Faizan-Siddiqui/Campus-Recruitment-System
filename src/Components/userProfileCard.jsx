import React from 'react';
import "../Style/userProfileCard.css";
import fallBackImage from "../Images/images.png";
import { Card, Grid } from '@material-ui/core';

function UserProfileCard({ campusData }) {
    return (
        <Grid container className="grid">
            <Grid item xl={8} lg={8} md={6} sm={12} xs={12} >
                <div className="main">
                    <Card>
                        <div className="pImgDiv">
                            <img src={campusData?.fileToUpload
                                ? campusData.fileToUpload
                                : fallBackImage} alt="" />
                        </div>
                        <div className="">
                            <h1>Profile Data</h1>

                        </div>
                    </Card>
                </div>
            </Grid>
        </Grid>


    )
}

export default UserProfileCard



    // <div classname="parent">
    //         <h1>profile</h1>
    //         <Card variant="outlined">
    //             <div className="pImgDiv">
    //                 {<img src={FallbackImg} alt="" />}
    //             </div>
    //         </Card>

    //     </div>



    // <Grid container justifyContent="center" alignItems="center" className="grid">
    //         <Grid item xl={8} lg={8} md={8} sm={10} xs={11}   >
    //             <Card className="cardBgColor">
    //                 <div className="parent">
    //                     <div className="main">
    //                         <div className="pImgDiv">
    //                             <img src={campusData?.fileToUpload
    //                                 ? campusData.fileToUpload
    //                                 : fallBackImage} alt="" className="pImg" />
    //                         </div>
    //                         <div className="pInfoDiv">dsjkfdkjkl
    //                             <p>dfjdshjkf</p></div>
    //                     </div>
    //                 </div >
    //             </Card>
    //         </Grid >
    //     </Grid >