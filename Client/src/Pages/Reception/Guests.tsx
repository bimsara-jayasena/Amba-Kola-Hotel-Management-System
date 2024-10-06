import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CustomizedDataGrid from "../../components/ReceptionDashboard/CustomizedDataGrid";

import Grid from "@mui/material/Grid2";

import StatCard, {
  StatCardProps,
} from "../../components/ReceptionDashboard/StatCard";

import HighlightedCard from "../../components/ReceptionDashboard/HighlightedCard";
import CustomCard from "../../components/ReceptionDashboard/CustomCard";

import Stack from "@mui/material/Stack";

import Header from "../../components/ReceptionDashboard/Header";
import {columns,rows}  from '../../internals/data/GuestData';
export default function Guests(){
  const [entity, setEntity] =React.useState("All Bookings");
 const[table,setTable]=React.useState(<></>)
  useEffect(()=>{
    switch(entity){
      case "In House Guests ":setTable(
        <CustomizedDataGrid columns={columns} rows={rows}/>
      );
      break;
      case "Today Check Outs":setTable(
        <CustomizedDataGrid columns={columns} rows={rows}/>
      );
      break;
      case "Today Arrivals":setTable(
        <CustomizedDataGrid columns={columns} rows={rows}/>
      );
      break;
      default:;
    }
  },[rows,entity])
    return(
      <>
      <Header routes={["Guests"]}/>
     <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
       Guests
     </Typography>
     <Grid container spacing={2}  columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
       <Grid container spacing={2}columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
       <button className="w-[25vw]" onClick={() => setEntity("In House Guests ")}>
         <CustomCard title="In House Guests" value={rows.length} />
       </button>
       <button  className="w-[25vw]" onClick={() => setEntity("Today Check Outs")} >
         <CustomCard title="Today Check outs" value={0} />
       </button>
       <button className="w-[25vw]" onClick={() => setEntity("Today Arrivals")}>
         <CustomCard title="Today Arrivals" value={0} />
       </button>
     </Grid>
     
     </Grid>
     <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
       {entity}
     </Typography>
     <Grid container spacing={2} columns={5}>
       <Grid size={{ md: 12, lg: 9 }}>
        {table}
       </Grid>
      
     </Grid>
   </>
    )
}