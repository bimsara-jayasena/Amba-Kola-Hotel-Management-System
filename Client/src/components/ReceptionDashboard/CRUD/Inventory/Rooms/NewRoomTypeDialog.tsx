import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Save from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

type props = {
  open: boolean;
  handleClose: (value:string|null) => void;
 
};
export default function NewRoomTypeDialog({
  open,
  handleClose,
  
}: props) {
  const [type, setType] = React.useState("");
  const [existTypes,setExistTypes]=React.useState([]);
  const [typeError,setTypeError]=React.useState(false);
  const [typeErrorMsg,setTypeErrorMsg]=React.useState("");
  
  
  React.useEffect(()=>{
    axios.get('http://localhost:5555/roomType')
    .then((res)=>{
      const roomTypes=res.data.map((room:any)=>room.type);
      setExistTypes(roomTypes)
    })
    .catch((err)=>console.log(err));
   
  },[])
  const handleSubmit = () => {
   
     const isExist=existTypes.some((element:any)=>element==type);

     if(isExist){
      setTypeError(true);
      setTypeErrorMsg("this room type already exist");
     }else if(type==""){
      setTypeError(true);
      setTypeErrorMsg("please enter the room type");
     }else{
       const newType={
        "type":type,
        "room_quantity":0
      }
      axios.post('http://localhost:5555/roomType/add',newType)
      .then((res)=>{
       handleClose('new Room type added')
      })
      .catch((err)=>console.log(err)); 
     }
    
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => handleClose(null)}>
        <DialogTitle>Add New Room Type</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="department">Room Type</FormLabel>
              <TextField
                error={typeError}
                helperText={typeErrorMsg}
                required
                id="type"
                name="type"
                type="text"
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
                sx={{ marginBottom: "2rem" }}
              />
            </Grid>
            
          </Grid>

          <Divider />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(null)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
