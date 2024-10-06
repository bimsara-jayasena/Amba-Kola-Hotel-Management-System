import React from "react";
import Typography from "@mui/material/Typography";
import CustomizedDataGrid from "../../components/AdminDashboard/CustomizedDataGrid";
import Header from "../../components/AdminDashboard/Header";
export default function Shop(){
    return(
        <>
          <Header routes={['Inventory','Shop']}/>
        <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 2, textAlign: "left" }}
          >
            Shop
          </Typography>
        
       
        </>
    )
}