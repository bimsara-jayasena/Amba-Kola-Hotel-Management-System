import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import GetData from '../../internals/data/RoomsData';
import { HighlightItemData } from '@mui/x-charts/context';
import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../../internals/components/CustomIcons';
import { JsxElement } from 'typescript';
import { AnyARecord } from 'dns';
import { Button } from '@mui/material';





interface StyledTextProps {
  variant: 'primary' | 'secondary';
}

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextProps>(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

const colors = [
  'hsl(200 100% 60%)',
  'hsl(210, 100%, 30%)',
  'hsl(200, 100%, 40%)',
  'hsl(200 99% 1%)'
 
];

export default function RoomChart() {
  const [roomData,setRoomData]=React.useState<any[]>([]);
  const [selectedItem,setSelectedItem]=React.useState("All Rooms");
 
  const [roomTypes,setRoomTypes]=React.useState<any[]>([]);
  
  const  {rows,occuipied,checked,available,typeRows}=GetData();
  
  /*  */
  React.useEffect(()=>{
  
    const types=typeRows.map((row)=>row.type);
    const typeQuantity=typeRows.map((row)=>row.quantity);
    
    const object=types.map((type:string,index:number)=>{
        
        const obj={
          type:type,
          quantity:typeQuantity[index]
        }
        return obj;
    })
   setRoomTypes(object);

  },[typeRows]);
  

  
  


  const outerData = [
    { label: "Available", value:available.length},
    { label:'Occuipied', value: occuipied.length },
    { label: 'Checked Out', value:checked.length},
  
  
  ];
  const innerData = [
    {label: "", value:0},
    {label: "", value:0},
    {label: "", value:0},
    {label: "All Rooms", value:rows.length},
    
  
  
  ];
 
   React.useEffect(()=>{
    
      const data=roomTypes.map((room:any)=>{
        const tempobj={
          name:room.type ,
          value:room.quantity,
          flag: <AccessAlarmIcon />,
          color: 'hsl(220, 25%, 65%)',
        }
        return tempobj;
   
      });
      setRoomData(data)
  },[roomTypes]) 
  const handleRoomData=(data:any)=>{
     if(data.seriesId=="inner"){
      setSelectedItem("All Rooms");
      const data=roomTypes.map((room:any)=>{
        const tempobj={
          name:room.type ,
          value:room.quantity,
          flag: <AccessAlarmIcon />,
          color: 'hsl(220, 25%, 65%)',
        }
        return tempobj;
   
      });
      setRoomData(data);
     }
     else{
      const index=data.dataIndex;
      setSelectedItem(outerData[data.dataIndex].label+" Rooms");
      switch(index){
      
        case 0:{
           
           const availableRooms:any=roomTypes.map((type:any)=>{
             const obj=available.filter((room:any)=>room.room_type==type.type);
             const data={
                  name:type.type,
                  value:obj.length,
                  flag: <AccessAlarmIcon />,
                  color: 'hsl(220, 25%, 65%)',
            };
            return data;
           })

           
           

          setRoomData(availableRooms);
          
        }
        break;
        case 1:{
          const occuipiedRooms:any=roomTypes.map((type:any)=>{
            const obj=occuipied.filter((room:any)=>room.room_type==type.type);
            const data={
                 name:type.type,
                 value:obj.length,
                 flag: <AccessAlarmIcon />,
                 color: 'hsl(220, 25%, 65%)',
           };
           return data;
          })

         setRoomData(occuipiedRooms);
        };
        break;
        case 2:{
          const checkedRooms:any=roomTypes.map((type:any)=>{
            const obj=checked.filter((room:any)=>room.room_type==type.type);
            const data={
                 name:type.type,
                 value:obj.length,
                 flag: <AccessAlarmIcon />,
                 color: 'hsl(220, 25%, 65%)',
           };
           return data;
          })

         setRoomData(checkedRooms);
        };
        break;
      } 
     }
     
     /*  */
     
     
  }
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Rooms
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            
            series={[
              {
                id:"outer",
                data:outerData,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
                
              },
              {
                id:"inner",
                data:innerData,
                innerRadius: 0,
                outerRadius: 70,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
                
              },
             
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
            onItemClick={(event:any,data:any)=>{handleRoomData(data)}}
           
            //onHighlightChange={setHighLightedItem}
           
           
            
          >
            <PieCenterLabel primaryText={rows.length.toString()} secondaryText="Total Rooms" />
          </PieChart>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: '500' ,textAlign:'left',marginBottom:'1rem'}}>
                  {selectedItem}
        </Typography>
        {roomData.map((room, index) => (
        
         
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {room.flag}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {room.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {room.value}
                </Typography>
              </Stack>
             {selectedItem!=='All Rooms'? (<LinearProgress
                variant="determinate"
                aria-label="Number of users by room"
                value={room.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: room.color,
                  },
                }}
              />):null}
            </Stack>
          </Stack>
       
        ))}
      </CardContent>
    </Card>
  );
}
