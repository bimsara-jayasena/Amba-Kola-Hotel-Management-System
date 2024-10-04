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
import { DialogActions, DialogContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { stringify } from "querystring";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { green } from "@mui/material/colors";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Grid from "@mui/material/Grid2";
type props = {
  id: number;
  table: string;
  handleUpdate: (value: boolean) => void;
  handleDelete: (value: boolean) => void;
  open: boolean;
  handleClose: () => void;
};
export default function UpdateEmp({
  id,
  table,
  handleUpdate,
  handleDelete,
  open,
  handleClose,
}: props) {
  const [data, setData] = React.useState<any>({});
  const [values, setValues] = React.useState<string[]>(["A", "B"]);
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([{}]);
  const [department, setDepartment] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState(false);
  /* const [open, setOpen] = React.useState(false); */
  const [recordObj, setRecordObj] = React.useState({
    test: "this is a test field",
  });

  const [departments, setDepartments] = React.useState<any[]>([]);
  const [edit, setEdit] = React.useState(false);
  const [departmentChange, setDepartmentChanged] = React.useState(false);

  const labelConfig: { [key: string]: string[] } = {
    employees: [
      "Employe Id",
      "First Name",
      "Last Name",
      "Email",
      "Contact No",
      "Street",
      "City",
      "Postal code",
      "State",
      "Department",
      "Role",
    ],
  };
  const labels = labelConfig[table];
  const getEmployeData = () => {
    axios.get(`http://localhost:5555/employees/35`).then((res) => {
      const obj = res.data;
      
      console.log(obj);
      setDepartment(obj["department"]);
      setRole(obj["role"]);
      setData(obj);
    });
  };
  const getDepartmentData = () => {
    axios
      .get("http://localhost:5555/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getRoles = () => {
    const roleobj = departments.map((element: any) => {
      const department: string = element.department;
      const value = [...element.role];

      const obj = {
        [department]: value,
      };
      return obj;
    });
    setRoles(roleobj);
  };

  React.useEffect(() => {
    getEmployeData();
    getDepartmentData();
  }, [id, table]);

  React.useEffect(() => {
    getRoles();
  }, [departments]);

  const handleInputChange = (key: string, e: any) => {
    const newData = { ...data };
    newData[key] = e.target.value;
    setData(newData);
  };
  const departmentChangeHandler = (value: string) => {
    setDepartment(value);
    data["department"] = value;
  };
  const roleChangeHandler = (value: string) => {
    setRole(value);
    data["role"] = value;
  };

  const updateHandler = () => {
    axios
      .put(`http://localhost:5555/${table}/${id}`, data)
      .then((res) => {
        handleUpdate(true);
      })
      .catch((er) => {
        console.log(er);
      });
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

  React.useEffect(() => {}, []);

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogContent>
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          {`${table.charAt(0).toUpperCase() + table.slice(1, 7)} Details`}
        </Typography>

        <Grid container spacing={2}>
          {Object.keys(data).map((key, index) =>{
            const commonProps={
              id:key,
              fullWidth:true,
              name:key,
              value:data[key],
              onChange:(e:any)=>handleInputChange(key,e),
              disabled:!edit
            }
           switch(key){
            case "department" : return(
              <Grid size={{ xs: 6, md: 6 }} key={index}>
                <FormLabel htmlFor="role">Department</FormLabel>
                <Select
                {...commonProps}
                
                  value={department}
                  label="department"
                  onChange={(e: any) => departmentChangeHandler(e.target.value)}
                
                >
                  {departments.map((element) => (
                    <MenuItem value={element.department}>
                      {element.department}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ) 
           case "role" :return (
              <Grid size={{ xs: 6, md: 6 }} key={index}>
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select
                  {...commonProps}
                  value={role}
                  onChange={(e: any) => roleChangeHandler(e.target.value)}
                 
                >
                  {roles.map((element: any) =>
                    element[department]
                      ? element[department].map(
                          (element: any, index: number) => (
                            <MenuItem value={element} key={index}>
                              {element}
                            </MenuItem>
                          )
                        )
                      : null
                  )}
                </Select>
              </Grid>
            ) 
            case "first_name":
            case "last_name" :return (
              <Grid size={{ xs: 6, md: 6 }} key={index}>
                <FormLabel htmlFor={key}>{labels[index]}</FormLabel>
                <TextField
                  {...commonProps}
                  type="text"
                />
              </Grid>
            ) 
            case "street" :
            case "state" :
            case "email" :
            case "contact_no" :
            case "email" : return (
              <Grid size={{ xs: 12 }}>
                <FormLabel htmlFor={key}>{labels[index]}</FormLabel>
                <TextField
                {...commonProps}
                type="text"
                />
              </Grid>
            ) 
            case "city" :
            case "postal_code" : return (
              <Grid size={{ xs: 6, md: 6 }}>
                <FormLabel htmlFor={key}>{labels[index]}</FormLabel>
                <TextField
                 {...commonProps}
                 type="text"
                />
              </Grid>
            ) 
            default :
             return null;
           };
          }
          )
           
          }
        </Grid>
      </DialogContent>
        <DialogActions>
      <Button
       
        onClick={!edit ? () => setEdit(true) : () => updateHandler()}
       
      >
        {edit ? <>Save Changes</> : <>Update</>}
      </Button>
      <Button onClick={deleteHandler} sx={{":hover":{background:'red'}}}>
        delete
      </Button>
      </DialogActions>
      {}
    </Dialog>
  );
}
