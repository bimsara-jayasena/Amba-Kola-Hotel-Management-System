import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StatCard, {
  StatCardProps,
} from "../../components/AdminDashboard/StatCard";
import CustomizedDataGrid from "../../components/AdminDashboard/CustomizedDataGrid";
import HighlightedCard from "../../components/AdminDashboard/HighlightedCard";
import PageViewsBarChart from "../../components/AdminDashboard/PageViewsBarChart";
import SessionChart from "../../components/AdminDashboard/SessionChart";
import Stack from "@mui/material/Stack";
import ChartUserByCountry from "../../components/AdminDashboard/ChartUserByCountry";
import Header from "../../components/AdminDashboard/Header";
import {columns,rows}  from '../../internals/data/gridData';
const data: StatCardProps[] = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Conversions",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    title: "Event count",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];
export default function Home() {
  return (
    <>
       <Header />
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        Homessss
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <SessionChart />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          <CustomizedDataGrid columns={columns} rows={rows}/>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
