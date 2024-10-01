import React from "react";
import Typography from "@mui/material/Typography";
import Header from "../../components/AdminDashboard/Header";
export default function Rooms(){
    
    return(
        <>
           <Header routes={["Inventory","Rooms"]}/>
        <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 2, textAlign: "left" }}
          >
            Rooms
          </Typography>
       
        </>
    )
}