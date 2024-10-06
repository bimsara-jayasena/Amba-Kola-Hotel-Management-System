import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Save from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

type props = {
  open: boolean;
  handleClose: (value: string | null) => void;
};
export default function NewRoomDialog({ open, handleClose }: props) {
  const [key, setKey] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");

  const [keyError,setKeyError]=React.useState(false);
  const [keyErrorMsg,setKeyErrorMsg]=React.useState("");

  const [typeError,setTypeError]=React.useState(false);
  const [typeErrorMsg,setTypeErrorMsg]=React.useState("");

  const[priceError,setPriceError]=React.useState(false);
  const [priceErrorMsg,setPriceErrorMsg]=React.useState("");

  const [rooms,setRooms]=React.useState<any>([]);
  const [availableTypes, setAvailableTypes] = React.useState<string[]>([]);
  React.useEffect(() => {
    axios.get("http://localhost:5555/roomType").then((res) => {
      const types = res.data.map((element: any) => element.type);
      
      setAvailableTypes(types);
    });
    axios.get('http://localhost:5555/rooms')
    .then((res)=>setRooms(res.data))
    .catch((err)=>console.log(err));
  }, []);
 



  const validate=()=>{
    const keyExist=rooms.some((element:any)=>element.room_key==key);
    console.log(key);
    let isValid=true;
    
    if(key==""){
      isValid=false;
       setKeyError(true);
       setKeyErrorMsg("please enter key ");
    }else if(keyExist){
      isValid=false;
      setKeyError(true);
      setKeyErrorMsg("this key is already assigned");
    }

    if(type==""){
      isValid=false;
      setTypeError(true);
      setTypeErrorMsg("please enter room type ");
   }

   if(price==""){
    isValid=false;
    setPriceError(true);
    setPriceErrorMsg("please enter price ");
 }
 
 return isValid;
  }

  const handleSubmit = () => {
    if(validate()){
      try {
        const newRoom = {
          room_key: key,
          room_type: type,
          room_price: price,
          room_status: "available",
        };
        axios.post(`http://localhost:5555/rooms/add`,newRoom)
    .then((res)=>handleClose("New Room Added Successfully"))
    .catch((err)=>console.log(err));
       
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => handleClose(null)}>
        <DialogTitle>Add New Room</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="key">Room Key</FormLabel>

              <TextField
                error={keyError}
                helperText={keyErrorMsg}
                fullWidth
                name="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="type">Room Type</FormLabel>
              <Select
                error={typeError}
                required
                id="type"
                name="type"
                type="text"
                fullWidth
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Select Room type</MenuItem>
                  <Divider/>
                {availableTypes.map((type: string) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="price">Room Price</FormLabel>

              <TextField
                error={priceError}
                helperText={priceErrorMsg}
                fullWidth
                name="price"
                value={price}
                onChange={(e: any) => {
                  setPrice(e.target.value);
                }}
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
