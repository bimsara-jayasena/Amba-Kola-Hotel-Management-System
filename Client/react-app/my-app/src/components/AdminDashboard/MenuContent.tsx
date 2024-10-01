import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import StorefrontIcon from '@mui/icons-material/Storefront';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { styled } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { myContext } from '../../Pages/Admin/Dashboard';
import { redirect } from 'react-router-dom';
import { Link } from '@mui/material';

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];
const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
});
let parentFunction:any;
export function HandleRoutes(){
    parentFunction=React.useContext(myContext);
    return(<></>);
}

export default function MenuContent() {

  // const check=()=>{
  //   redirect('/Dashboard/Home')
  // }
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      
      <Box sx={{ minHeight: 352, minWidth: 200,textAlign:'start' }}>
      <SimpleTreeView
        defaultExpandedItems={['grid']}
        slots={{
        
          expandIcon: AddBoxIcon,
          collapseIcon: IndeterminateCheckBoxIcon,
          
        }}
      >
      
          <CustomTreeItem itemId="home" label="Home"  slots={{icon:HomeIcon}} onClick={()=>parentFunction("Home")}/>
        
       
        <CustomTreeItem itemId="Inventory" label="Inventory" slots={{icon:InventoryIcon}}>
          <CustomTreeItem itemId="rooms" label="Rooms" slots={{icon:BedroomParentIcon}}  onClick={()=>parentFunction("Rooms")}/>
          <CustomTreeItem itemId="resturont" label="Restorent" slots={{icon:RestaurantIcon}}  onClick={()=>parentFunction("Resturonts")}/>
          <CustomTreeItem itemId="shop" label="Shop" slots={{icon:ShoppingBagIcon}}  onClick={()=>parentFunction("Shop")}/>
        </CustomTreeItem>
        <CustomTreeItem itemId="guests" label="Guests" slots={{icon:EmojiPeopleIcon}}  onClick={()=>parentFunction("Guests")}>
          
        </CustomTreeItem>
        <CustomTreeItem itemId="report" label="Analaysis" slots={{icon:AnalyticsIcon}} >
          <CustomTreeItem itemId="income" label="income" slots={{icon:AccountBalanceIcon}}  onClick={()=>parentFunction("Income")}/>
          <CustomTreeItem itemId="arrives" label="Guest arrives" slots={{icon:FlightLandIcon}} onClick={()=>parentFunction("Arrives")} />
          <CustomTreeItem itemId="sells" label="Shop" slots={{icon:StorefrontIcon}}  onClick={()=>parentFunction("Sells")}/>
        </CustomTreeItem>
        <CustomTreeItem itemId="Staff" label="Staff" slots={{icon:EmojiPeopleIcon}}  onClick={()=>parentFunction("Staff")}>
          
          </CustomTreeItem>
      </SimpleTreeView>
    </Box>
      {/*  */}

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
