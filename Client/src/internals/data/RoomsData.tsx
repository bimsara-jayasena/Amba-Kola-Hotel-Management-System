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
    field: "room_no",
    headerName: "Room No.",
    flex: 1,
    width: 50,
  },
  {
    field: "room_key",
    headerName: "Room Key",
    flex: 1,
    width: 150,
  },
  {
    field: "room_type",
    headerName: "Room Type",
    flex: 1,
    width: 150,
  },
  {
    field: "room_price",
    headerName: "Price",
    flex: 1,
    width: 150,
  },
  
  { field: 'room_status',headerName: 'Status',flex: 1, width: 150,renderCell: (params) => renderStatus(params.value as any),}
];

export const roomTypeCol: GridColDef<(typeof typeRows)[number]>[] = [
  {
    field: "type",
    headerName: "Type ",
    flex: 1,
    width: 50,
  },
  {
    field: "quantity",
    headerName: "Room Quantity",
    flex: 1,
    width: 150,
  }
 
];

export const rows = [{ id:1,room_no: "",room_key:"" ,room_type: "", room_price: "", room_status: "" }];
export const typeRows = [{ id:1,type: "",quantity:0}];

function GetData() {
  const [rows, setRows] = useState<any[]>([]);
  const [typeRows,setTypeRows]=useState<any[]>([]);
  const [occuipied, setOccuipied] = useState<any[]>([]);
  const [available, setAvailable] = useState<any[]>([]);
  const [checked, setChecked] = useState<any[]>([]);
  const fetchData = () => {
   
      axios
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
        });

        axios
        .get("http://localhost:5555/roomType")
        .then((res) => {
          const data = res.data.map((element: any) => {
            const obj = {
                id:element.type_id,
                type:element.type,
                quantity:element.room_quantity,
                
            };
            return obj;
          });
          setTypeRows(data);
        })
        .catch((err) => {
          console.log(err);
        });
   
  };
 
 
  useEffect(() => {
    fetchData();
  }, []);
  return { rows, columns,roomTypeCol,typeRows, fetchData };
}

export default GetData;