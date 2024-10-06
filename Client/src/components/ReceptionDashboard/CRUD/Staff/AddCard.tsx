import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DialogActions, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { stringify } from "querystring";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { green } from "@mui/material/colors";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid2";
type props = {
  id: number;
  table: string;
  handleUpdate: (value: boolean) => void;
  handleDelete: (value: boolean) => void;
  opend: boolean;
  handleClose: () => void;
};
export default function AddCard({
  id,
  table,
  handleUpdate,
  handleDelete,
  opend,
  handleClose,
}: props) {
  const [data, setData] = React.useState<any>({});
  const [values, setValues] = React.useState<string[]>(["A", "B"]);
  const [recordObj, setRecordObj] = React.useState({
    test: "this is a test field",
  });
  const [test, setTest] = React.useState("ff");
  const [role, setRole] = React.useState("Available Role List");
  const [newRole, setNewRole] = React.useState("");
  const [updateRole, setUpdateRole] = React.useState("");
  const [updatedRole, setUpdatedRole] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState(false);
  const [roleEdit, setRoleEdit] = React.useState(false);
  const [roleId, setRoleId] = React.useState<number>();
  const [refresh, setRefresh] = React.useState(false);
  const [disableDelete, setDisableDelete] = React.useState(false);
  const [updateErrorMsg, setUpdateErrorMsg] = React.useState("");
  const [updateError, setUpdateError] = React.useState(false);
  const [edit,setEdit]=React.useState(false);
  const menuCloseHandler = () => {
    setOpenMenu(false);
  };

  const labelConfig: { [key: string]: string[] } = {
    departments: ["Department Id", "Department", "employe quantity", "roles"],
  };
  const labels = labelConfig[table];
  const getData = () => {
    axios.get(`http://localhost:5555/${table}/${id}`).then((res) => {
      const obj = res.data[0];
      console.log(obj);
      setData(obj);
    });
  };
  React.useEffect(() => {
    getData();
  }, [id, table]);

  const updateHandler = () => {
    console.log("record ID: " + id + "\ndata", data);
    if(edit){
      
    axios
    .put(`http://localhost:5555/${table}/${id}`, data)
    .then((res) => {
      handleUpdate(true);
    })
    .catch((er) => {
      console.log(er);
    });
    }
  };
  const deleteHandler = () => {
    //delete function
    axios
      .delete(`http://localhost:5555/${table}/${id}`)
      .then((res) => handleDelete(true))
      .catch((err) => {
        console.log({ error: err.message });
      });
  };

  const change = (key: string, e: any) => {
    const newData = { ...data };
    newData[key] = e.target.value;
    setData(newData);
  };
  const [open, setOpen] = React.useState(false);
  /* 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */

  const handleOpenMenu = () => {
    setOpenMenu(false);
    setOpen(false);
    setRoleEdit(false);
  };

  /* const handleRoleUpdate = (e: SelectChangeEvent) => {
    setUpdatedRole(e.target.value);
  }; */
  const handleNewRole = () => {
    setOpen(true);
  };

  const addRole = () => {
    const newRecord = {
      role: newRole,
      emp_quantity: 0,
      department: data["department"],
    };

    axios
      .post("http://localhost:5555/roles/add", newRecord)
      .then((res) => {
        setOpen(false);
        getData();
        setDisableDelete(false);
      })
      .catch((error) => {
        if (error.status == "404") {
          setUpdateError(true);
          setUpdateErrorMsg(
            "Please save changes before adding/update/delete  role"
          );
        }
      });
  };

  const handleRoleEdit = (id: any, index: number) => {
    if (!roleEdit) {
      setRoleEdit(true);
      setRoleId(index);
    } else {
      const update = {
        role: updateRole,
      };
      axios
        .put(`http://localhost:5555/roles/${id}`, update)
        .then((res) => {
          setRoleEdit(false);
          getData();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleRoleDelete = (id: any, length: number) => {
    if (roleEdit) {
      setRoleEdit(false);
    } else if (length == 1) {
      setDisableDelete(true);
    } else {
      axios
        .delete(`http://localhost:5555/roles/${id}`)
        .then((res) => {
          getData();
        })
        .catch((error) => console.log(error));
    }
  };
  const showMenu=()=>{
    if(edit){
      setOpenMenu(true);
    }
  }
  
  return (
    <Dialog
      open={opend}
      onClose={() => handleClose()}
      
    >
      <DialogContent>
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          {`${table.charAt(0).toUpperCase() + table.slice(1, 7)} Details`}
        </Typography>

        <Box>
          {updateError ? (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {updateErrorMsg}
            </Alert>
          ) : null}
          <Grid container spacing={2}>
            {Object.keys(data).map((key, index) =>
            
              {
                const commonProps={
                id:key,
                fullWidth:true,
                name:key,
                value:data[key],
                onChange:(e:any)=>change(key,e),
                disabled:!edit

                
              }
              
              switch(key){
                case 'dep_id':
                case 'emp_quantity':return(
                    <Grid key={key}  size={{ xs: 12}}>
                    <FormLabel htmlFor={key}>{labels[index]}</FormLabel>
                    <TextField
                     {...commonProps}
                      type="text"
                      disabled
                    />
                  </Grid>
                 )
                 case 'department':return(
                  <Grid key={key}  size={{ xs: 12}}>
                  <FormLabel htmlFor={key}>{labels[index]}</FormLabel>
                  <TextField
                   {...commonProps}
                    type="text"
                  
                  />
                </Grid>
                 )
                 default:
                   if(  Array.isArray(data[key])){
                      return(
                        <Grid key={index} size={{ xs: 12 }}>
                          <FormLabel htmlFor="role">Role List</FormLabel>
        
                          <Select
                           
                            {...commonProps}
                            value={""}
                            label="Role List"
                            open={openMenu}
                            onClick={showMenu}
                            displayEmpty
                           
                          >
                             <MenuItem value="">Available Role List</MenuItem>
                            <ClickAwayListener onClickAway={handleOpenMenu}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1rem",
                                }}
                              >
                                
                                {data[key].map(
                                  (value: any, index: any, array: any[]) => (
                                    <MenuItem
                                      id={index}
                                      value={index}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
        
                                    >
                                      {roleEdit && roleId == index ? (
                                        <TextField
                                          id="edit_role"
                                          value={updateRole}
                                          onChange={(e) =>
                                            setUpdateRole(e.target.value)
                                          }
                                          placeholder={value.r}
                                        ></TextField>
                                      ) : (
                                        value.r
                                      )}
        
                                      <Paper
                                        sx={{ display: "flex", alignItems: "center" }}
                                      >
                                        <Button disabled>
                                          <Typography sx={{ color: "white" }}>
                                            {value.quantity}
                                          </Typography>
                                        </Button>
        
                                        <Button
                                          onClick={() =>
                                            handleRoleEdit(value.id, index)
                                          }
                                        >
                                          {roleEdit && roleId == index ? (
                                            <SaveIcon />
                                          ) : (
                                            <EditIcon />
                                          )}
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleRoleDelete(value.id, array.length)
                                          }
                                          disabled={
                                            !roleEdit && disableDelete ? true : false
                                          }
                                        >
                                          {roleEdit && roleId == index ? (
                                            <CancelIcon />
                                          ) : (
                                            <DeleteIcon />
                                          )}
                                        </Button>
                                      </Paper>
                                    </MenuItem>
                                  )
                                )}
                                <Divider />
                                {open ? (
                                  <TextField
                                    id="new_role"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    placeholder="new role..."
                                  ></TextField>
                                ) : null}
                                <Button
                                  variant="contained"
                                  onClick={open ? addRole : handleNewRole}
                                >
                                  {open ? "Save" : "Add New Role"}
                                </Button>
                              </Box>
                            </ClickAwayListener>
                          </Select>
                        </Grid>
                      )
                
                   }
               }
            }
             
             )}
          </Grid>
         
        </Box>
      </DialogContent>
      <DialogActions>
      <Button onClick={edit? updateHandler:()=>setEdit(true)}>
            {edit? (<>Save changes</>):(<>Update</>)}
          </Button>
          <Button onClick={deleteHandler} sx={{":hover":{background:'red'}}}>
            delete
          </Button>
      </DialogActions>
    </Dialog>
  );
}
