import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { forEachChild } from "typescript";
type props = {
  open: boolean;
 
  handleClose: (value: string | null) => void;
  data: any[];
};
export default function UpdateStatusDialog({open, handleClose,data}: props) {
   const [rooms,setRooms]=React.useState<any[]>([]);

   const handleSubmit=async()=>{
    const promises=data.map((id)=> {
      const updateData={ "room_status":"available" }
      return axios.put(`http://localhost:5555/rooms/${id}`,updateData)
       .then((res)=>{return null })
       .catch((err)=>console.log(err))
    
    });
    await Promise.all(promises);
    handleClose(`Rooms Are Now Available`);
    
    
   
   }
  return (
    <React.Fragment>
    
      <Dialog
        open={open}
        onClose={() => handleClose(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Make Selected Rooms as Available?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will make all the selected rooms as availabale
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleSubmit} autoFocus>
            Yes
          </Button>
          <Button onClick={() => handleClose(null)}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
