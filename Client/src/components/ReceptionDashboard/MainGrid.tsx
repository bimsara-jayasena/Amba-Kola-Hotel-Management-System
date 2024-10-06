import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../internals/components/Copyright";
import StatCard, { StatCardProps } from "./StatCard";
import { myContext } from "../../Pages/Reception/Dashboard";
import Home from "../../Pages/Reception/Home";
import Rooms from "../../Pages/Reception/Rooms";
import Staff from "../../Pages/Reception/Staff";
import Income from "../../Pages/Reception/Income";
import Guests from "../../Pages/Reception/Guests";
import Restorent from "../../Pages/Reception/Restorent";
import Shop from "../../Pages/Reception/Shop";
import Arrives from "../../Pages/Reception/Arrives";
import Sells from "../../Pages/Reception/Sells";
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

export default function MainGrid() {
  const [component, setComponent] = React.useState(<></>);
  const route = React.useContext(myContext);

  React.useEffect(() => {
    switch (route) {
      case "Home":
        setComponent(<><Home/></>);
        break;
      case "Guests":
        setComponent(
          <>
            <Guests/>
          </>
        );
        break;
      case "Rooms":
        setComponent(
          <>
            <Rooms/>
          </>
        );
        break;
      case "Resturonts":
          setComponent(
            <>
              <Restorent/>
            </>
          );
          break;
      case "Shop":
            setComponent(
              <>
               <Shop/>
              </>
            );
            break;
      case "Income":
              setComponent(
                <>
                 <Income/>
                </>
              );
              break;
      case "Arrives":
                setComponent(
                  <>
                    <Arrives/>
                  </>
                );
                break;
      case "Sells":
                  setComponent(
                    <>
                      <Sells/>
                    </>
                  );
                  break;
      case "Staff":
          setComponent(
            <>
             <Staff/>
            </>
          );
          break;
          
    }
    

  },[route]);

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
       
        <div>{component}</div>
        <Copyright sx={{ my: 4 }} />
        
      
      </Box>
    </>
  );
}
