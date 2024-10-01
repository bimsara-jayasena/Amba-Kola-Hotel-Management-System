import * as React from "react";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../../components/AdminDashboard/AppNavbar";
import Header from "../../components/AdminDashboard/Header";
import MainGrid from "../../components/AdminDashboard/MainGrid";
import SideMenu from "../../components/AdminDashboard/SideMenu";
import AppTheme from "../../theme/AppTheme";
import { Routes, Route } from "react-router-dom";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../../theme/customizations";
import { useContext } from "react";
import { HandleRoutes } from "../../components/AdminDashboard/MenuContent";
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};
var defaultValue;
export const myContext = React.createContext(defaultValue as any);
export default function Dashboard(props: any) {
  const [page, setPage] = React.useState("");
  const handleRoutes = (route: string) => {
   setPage(route);
  };
  return (
    <>
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: "flex" }}>
         
            <SideMenu />
            <AppNavbar />
            <myContext.Provider value={handleRoutes}>
                <HandleRoutes/>
            </myContext.Provider>
        
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme
                  ? `rgba(${theme.palette.background.default} / 1)`
                  : alpha(theme, 1),
                overflow: "auto",
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 3,
                  pb: 10,
                  mt: { xs: 8, md: 0 },
                }}
              >
               {/*  <Header /> */}
               <myContext.Provider value={page}>
                  <MainGrid/>
               </myContext.Provider>
              </Stack>
            
          </Box>
        </Box>
      </AppTheme>
    </>
  );
}
