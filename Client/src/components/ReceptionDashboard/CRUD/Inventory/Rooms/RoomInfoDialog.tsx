import React, { useState, useEffect, ChangeEventHandler } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
  FormLabel,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { stat } from "fs";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

type props = {
  id: number;
  table: string;
  open: boolean;

  handleClose: (value: string | null) => void;
};
export default function RoomInfoDialog({ id, table, open, handleClose }: props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any | undefined>({});
  const [status,setStatus]=useState([]);
  const [types,setTypes]=useState([]);
  const [confirmDelete,setConfirmDelete]=React.useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/rooms/${id}`)
      .then((res) => {
        setData(res.data);
       
      })
      .catch((err) => console.log(err));

      axios.get('http://localhost:5555/roomStatus')
      .then((res)=>{
        const result=res.data.map((status:any)=>status.status);
        setStatus(result);
      })

      axios.get('http://localhost:5555/roomType')
      .then((res)=>{
        const result=res.data.map((room:any)=>room.type);
        setTypes(result);
      })
  }, []);
  
  const handleInputChange = (key: string, e: SelectChangeEvent) => {
    const newData = { ...data };
    newData[key] = e.target.value;
    setData(newData);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const closeDialog=()=>{
    setConfirmDelete(false);
  }

  const updateHandler = () => {
    const room = {
      room_key: data["room_key"],
      type: data["type"],
      room_price: data["room_price"],
      room_status: data["status"],
    };
    axios
      .put(`http://localhost:5555/rooms/${id}`, room)
      .then((res) => {
        handleClose("updated");
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = () => {
    setConfirmDelete(true)
  };

  return (
    <Dialog open={open} onClose={() => handleClose(null)}>
      <DialogContent>
      
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          Room Insdsdsdfo Room ID:{id}
        </Typography>
        {confirmDelete? (<DeleteConfirmationDialog open={confirmDelete} closeDialog={closeDialog} handleClose={handleClose} entity="rooms" id={id}/>):null}
        <Grid container spacing={2}>
          {Object.keys(data).map((key: any, index: number) => {
            switch (key) {
              case "status":
                return (
                  <Grid size={{ xs: 12 }} key={index}>
                    <FormLabel htmlFor={key}>{key}</FormLabel>
                    <Select
                      required
                      id="status"
                      name="status"
                      type="text"
                      fullWidth
                      value={data['status']}
                      onChange={(e: any) => handleInputChange(key,e)}
                      displayEmpty
                      disabled={!edit}
                    >
                      <MenuItem value="">Select Room type</MenuItem>
                      <Divider />
                      {status.map((type: string) => (
                        <MenuItem value={type} disabled={type=='occupied'?true:false}>{type}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                );
              case 'type':
                return(
                  <Grid size={{ xs: 12 }} key={index}>
                    <FormLabel htmlFor={key}>{key}</FormLabel>
                    <Select
                      required
                      id="type"
                      name="type"
                      type="text"
                      fullWidth
                      value={data['type']}
                      onChange={(e: any) => handleInputChange(key,e)}
                      displayEmpty
                      disabled={!edit}
                    >
                      <MenuItem value="">Select Room type</MenuItem>
                      <Divider />
                      {types.map((type: string) => (
                        <MenuItem value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                );
                break;
              default:
                return (
                  <Grid size={{ xs: 12 }} key={index}>
                    <FormLabel htmlFor={key}>{key}</FormLabel>
                    <TextField
                      fullWidth
                      id={key}
                      name={key}
                      value={data[key]}
                      onChange={(e: any) => {
                        handleInputChange(key, e);
                      }}
                      disabled={!edit}

                    />
                  </Grid>
                );
            }
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
       
            <Button
              onClick={()=>handleClose(null)}
              sx={{ ":hover": { background: "red" } }}
            >
              Close
            </Button>
          
      
      </DialogActions>
      {}
    </Dialog>
  );
}
