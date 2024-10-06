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
import Alert from '@mui/material/Alert';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

import { stat } from "fs";

type props = {
  id: number;
  table: string;
  open: boolean;

  handleClose: (value: string | null) => void;
};
export default function TypeInfoDialog({
  id,
  table,
  open,
  handleClose,
}: props) {
  
  const [type, setType] = React.useState("");
  const [existTypes, setExistTypes] = React.useState([]);
  const [edit, setEdit] = useState(false);
  const [typeError, setTypeError] = React.useState(false);
  const [typeErrorMsg, setTypeErrorMsg] = React.useState("");
  const [occuipiedTypes, setOccuipiedTypes] = React.useState([]);
  const [occuipied, setOccuipied] = React.useState(false);
  const [confirmDelete,setConfirmDelete]=React.useState(false);

  React.useEffect(() => {
    axios.get("http://localhost:5555/rooms").then((res) => {
      const occuipied = res.data.map((room: any) =>
        room.status == "occupied" ? room.type : ""
      );
      
      setOccuipiedTypes(occuipied);
    })
  },[]);
  React.useEffect(()=>{
      axios
      .get("http://localhost:5555/roomType")
      .then((res) => {
        const roomTypes = res.data.map((room: any) => room.type);
        const data = res.data.filter((room: any) => room.type_id == id);
        const isOccuipied = occuipiedTypes.some(
          (type: any) => type == data[0].type
        );
        console.log(occuipiedTypes)
        setType(data[0].type);
        setOccuipied(isOccuipied);
        setExistTypes(roomTypes);
      })
      .catch((err) => console.log(err));

  },[occuipiedTypes])

  const handleEdit = () => {
    setEdit(true);
  };
  const updateHandler = () => {
    const isExist = existTypes.some((element: any) => element == type);

    if (isExist) {
      setTypeError(true);
      setTypeErrorMsg("this room type already exist");
    } else {
      const newType = {
        type: type,
        room_quantity: 0,
      };
    
      axios
        .put(`http://localhost:5555/roomType/${id}`, newType)
        .then((res) => {
          handleClose("Room type Updated");
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteHandler = () => {
     setConfirmDelete(true);
  };
  const closeDialog=()=>{
    setConfirmDelete(false);
  }

  return (
    <Dialog open={open} onClose={() => handleClose("")}>
      <DialogContent>
        {confirmDelete? (<DeleteConfirmationDialog open={confirmDelete} closeDialog={closeDialog} handleClose={handleClose} entity="roomType" id={id}/>):null}
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          Room Type:{id}
        </Typography>
        {occuipied? <Alert variant="filled" severity="info" >cannot make changes.This Type of Room is curruntly occuipied.</Alert>:null}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormLabel htmlFor="type">Room Type</FormLabel>
            <TextField
              error={typeError}
              helperText={typeErrorMsg}
              fullWidth
              id={type}
              name={type}
              value={type}
              onChange={(e: any) => setType(e.target.value)}
              disabled={!edit}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {occuipied ? (
          <>
          <Button onClick={()=>handleClose(null)}>
             close
            </Button>
          </>
        ) : (
          <>
            <Button onClick={!edit ? handleEdit : updateHandler}>
              {edit ? <>Save Changes</> : <>Update</>}
            </Button>
            <Button
              onClick={deleteHandler}
              sx={{ ":hover": { background: "red" } }}
            >
              delete
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
