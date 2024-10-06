import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs({route}:{route:string[]}) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body2">Dashboard</Typography>
      
       {route.map((r:any,index:number)=>{
          const item=index;
          switch(item){
            case route.length-1:return(
              <Typography variant= "body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {r}
              </Typography>
            )
            default:return(
              <Typography variant= "body2" >
              {r}
              </Typography>
            )
          }
       })}
      
    </StyledBreadcrumbs>
  );
}
