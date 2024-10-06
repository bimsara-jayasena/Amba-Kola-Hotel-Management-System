import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StatCard, {
  StatCardProps,
} from "../../components/ReceptionDashboard/StatCard";
import CustomizedDataGrid from "../../components/ReceptionDashboard/CustomizedDataGrid";
import HighlightedCard from "../../components/ReceptionDashboard/HighlightedCard";
import CustomCard from "../../components/ReceptionDashboard/CustomCard";

import Stack from "@mui/material/Stack";

import Header from "../../components/ReceptionDashboard/Header";
import {columns,rows}  from '../../internals/data/gridData';

export default function Home() {
  const [entity, setEntity] =React.useState("All Bookings");

  const addNewBooking=()=>{

  }
  return (
    <>
       <Header routes={["Home"]}/>
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        Homessss
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        
        
        <Grid container spacing={2}columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        <button className="w-[25vw]" onClick={() => setEntity("All Bookings")}>
          <CustomCard title="All Bookings" value={rows.length} />
        </button>
        <button  className="w-[25vw]" onClick={() => setEntity("Today Bookings")} >
          <CustomCard title="Today Bookings" value={0} />
        </button>
        <button className="w-[25vw]" onClick={() => setEntity(" Today Arrivals")}>
          <CustomCard title="Today Arrivals" value={0} />
        </button>
        <button className="w-[25vw]" onClick={() => setEntity("Today Check outs")}>
          <CustomCard title="Today Check outs" value={0} />
        </button>
        <button className="w-[25vw]" onClick={() => setEntity("Room Types")}>
          <CustomCard title="Today Revenue" value={0} />
        </button>
        <button className="w-[25vw]" onClick={() => setEntity("Available Rooms")}>
          <CustomCard title="Available Rooms" value={0} />
        </button>
      </Grid>
      
        
       
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        Bookings
      </Typography>
      <Grid container spacing={2} columns={5}>
        <Grid size={{ md: 12, lg: 9 }}>
            <div className="w-full flex justify-end mb-1">
              <button
                className="border border-slate-800 rounded w-[15rem] h-[2.5rem] hover:bg-slate-800"
                onClick={addNewBooking}
              >
                add new Booking
              </button>
            </div>
          <CustomizedDataGrid columns={columns} rows={rows}/>
        </Grid>
       
      </Grid>
    </>
  );
}
