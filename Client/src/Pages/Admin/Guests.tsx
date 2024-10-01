import React from "react";
import Typography from "@mui/material/Typography";
import CustomizedDataGrid from "../../components/AdminDashboard/CustomizedDataGrid";
export default function Guests(){
    return(
        <>
        <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 2, textAlign: "left" }}
          >
            Guests
          </Typography>
       
        </>
    )
}