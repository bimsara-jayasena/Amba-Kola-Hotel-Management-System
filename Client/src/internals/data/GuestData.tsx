import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
import {
  GridRowsProp,
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";

function renderStatus(status: 'Online' | 'Offline') {
    const colors: { [index: string]: 'success' | 'default' | 'warning' } = {
      available: 'success',
      occuipied: 'default',
      checked:'warning'
    };
  
    return <Chip label={status} color={colors[status]} size="small" sx={{width:'5rem'}}/>;
  }
  
export const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "name",
    headerName: "Guest Name.",
    flex: 1,
    width: 50,
  },
  {
    field: "arrived",
    headerName: "Arrived at",
    flex: 1,
    width: 150,
  },
  {
    field: "departure",
    headerName: "Departure Date",
    flex: 1,
    width: 150,
  },
  {
    field: "pending",
    headerName: "Pending Payments",
    flex: 1,
    width: 150,
  }
  
  /* { field: 'room_status',headerName: 'Status',flex: 1, width: 150,renderCell: (params) => renderStatus(params.value as any), }*/
];



export const rows = [{ id:1,name: "",arrived:"" ,departure: "", pending: "" }];


function GetData() {
  const [rows, setRows] = useState<any[]>([]);
  const [todayDepartureRows,setTodayDepartureRows]=useState<any[]>([]);
  const [todayArrival, setTodayArrival] = useState<any[]>([]);
  

  const fetchData = () => {
   
     /*  axios
        .get("http://localhost:5555/rooms")
        .then((res) => {
          const data = res.data.map((element: any) => {
            const obj = {
                id:element.room_id,
                room_no:element.room_id,
                room_key:element.room_key,
                room_type:element.type,
                room_price:element.room_price,
                room_status:element.status
            };
            return obj;
          });
         
          setRows(data);
        })
        .catch((err) => {
          console.log(err);
        }); */

        
   
  };
 
 
  useEffect(() => {
    fetchData();
  }, []);
  return { rows, columns, fetchData };
}

export default GetData;