import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomeDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadCrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../theme/ColorModeIconDropdown";
import { Box } from "@mui/material";
import Search from "./Search";
import Paper from "@mui/material";
import { relative } from "path";

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <Box sx={{
          border:"transparent",
          borderWidth:1,
         
          
        }}>
        <MenuButton aria-label="Open notifications">
        <span className="absolute top-[-5px] right-[-5px] flex h-3 w-3 ">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          <NotificationsRoundedIcon/>
        </MenuButton>
        </Box>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
