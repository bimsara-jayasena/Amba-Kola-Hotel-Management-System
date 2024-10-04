import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import ReportIcon from '@mui/icons-material/Report';
type props={
  open:boolean,
  closeDialog:()=>void,
  handleClose:(value:string|null)=>void,
  entity:string,
  id:number|string
}
export default function DeleteConfirmationDialog({open,closeDialog,handleClose,entity,id}:props) {

  const handleDelete=()=>{
    axios.delete(`http://localhost:5555/${entity}/${id}`)
    .then((res)=>handleClose('record deleted successfully'))
    .catch((err)=>console.log(err));
  }
  return (
    <React.Fragment>
    
      <Dialog
        open={open}
        onClose={()=>handleClose(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: 'red',
            boxShadow: 'none',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
        <ReportIcon fontSize={'large'}/>Confirm delete record? {id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {entity=="roomType"?(<>deleting room type will also remove all the room records that belongs to this type</>):(<>deleting room will remove all the details about this room</>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={handleDelete} autoFocus className='text-red-500'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
