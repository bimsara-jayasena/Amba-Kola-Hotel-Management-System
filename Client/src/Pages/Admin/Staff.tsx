import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CustomizedDataGrid from "../../components/AdminDashboard/CustomizedDataGrid";
import Grid from "@mui/material/Grid2";
import HighlightedCard from "../../components/AdminDashboard/HighlightedCard";
import StatCard, {
  StatCardProps,
} from "../../components/AdminDashboard/StatCard";
import CustomCard from "../../components/AdminDashboard/CustomCard";
import { Box, Button, TextField } from "@mui/material";
import { brand } from "../../theme/themePrimitives";
import Header from "../../components/AdminDashboard/Header";
import { columns, EmpRows } from "../../internals/data/EmployeeData";
import { depCol, useDepRows } from "../../internals/data/DepartmentData";
import CrudDataGrid from "../../components/AdminDashboard/CrudDataGrid";
import { Any } from "@react-spring/web";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { stat } from "fs";
import AddCard from "../../components/AdminDashboard/CRUD/Staff/AddCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { isMultipleKey } from "@mui/x-data-grid/utils/keyboardUtils";
import NewDepartmentDialog from "../../components/AdminDashboard/CRUD/Staff/NewDepartmentDialog";
import NewEmployeDialog from "../../components/AdminDashboard/CRUD/Staff/NewEmployeDialog";
import UpdateEmp from "../../components/AdminDashboard/CRUD/Staff/UpdateEmp";


export default function Staff() {
  const [title, setTitle] = useState("Employee Details");
  const [table, setTable] = useState(<></>);
  const [updated, SetUpdated] = useState(false);
  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState<number>(0);
  const [entity, setEntity] = useState("");
  const [multipleValue, setMultipleValue] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDetails,setShowDetails]=useState(false);
  const [depRows, setDepRows] = useState<any[]>([]);
  const [empRows, setEmpRows] = useState<any[]>([]);
  const [empCount,setEmpCount]=useState(0);
  const [depCount,setDepCount]=useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowDetails(false);
    setClicked(false);
  };

  const handleClick = (value: any) => {
    setId(value);
    setClicked(true);
    
  };
  const { empData, empDataLoading ,fetchEmpData} = EmpRows();
  const { depData, depDataLoading,fetchDepData} = useDepRows();

 useEffect(()=>{
 
  if (!depDataLoading) {
    setDepRows(depData);
    setDepCount(depData.length)
  
  }
  if (!empDataLoading) {
    setEmpRows(empData)
    setEmpCount(empData.length)
   
  }
 },[depData,empData]);
 

  
  const [role, setRole] = useState("");
 
  const handleUpdate = (status: boolean) => {
    SetUpdated(true);
    setClicked(false);
    
    fetchDepData();
    fetchEmpData();
    setTimeout(()=>SetUpdated(false),2000);
  };
  const handleDelete = () => {
   setDeleted(true);
   setClicked(false);
   fetchDepData();
   fetchEmpData();
   setTimeout(()=>{setDeleted(false)},2000)
  };
  const handleAdded = () => {
   
    setAdded(true);
    setOpen(false);
    fetchDepData();
    fetchEmpData();
   
    setTimeout(()=>setAdded(false),2000)
   
  };
  
  const handleComponent = (element: string) => {
    setTitle(element);
  };

  
  const changeSelection = (e: any) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    switch (title) {
      case "Employee Details":
        setTable(
          <>
            <div className="w-full flex justify-end mb-1">
              {" "}
              <button className="border border-slate-800 rounded w-[15rem] h-[2.5rem] hover:bg-slate-800" onClick={handleClickOpen}>
                add new
              </button>
            </div>
            <CustomizedDataGrid
              columns={columns}
              rows={empRows}
              onClickHandler={handleClick}
            />
          </>
        );
        setEntity("employees");
        break;
      case "Department Details":
        setTable(
          <>
            <div className="w-full flex justify-end mb-1">
              {" "}
              <button
                className="border border-slate-800 rounded w-[15rem] h-[2.5rem] hover:bg-slate-800"
                onClick={handleClickOpen}
              >
                add new
              </button>
            </div>
            <CustomizedDataGrid
              columns={depCol}
              rows={depRows}
              onClickHandler={handleClick}
            />

           
          </>
        );
        setEntity("departments");
        break;
    }
  }, [title, depRows, empRows]);
  

  return (
    <>
      {open ? 
        (entity=="employees" ? 
          (
            <>
             <NewEmployeDialog open={open} handleClose={() => handleClose()}handleSave={() => handleAdded()}/>
            </>
          )
          :
          (
            <>
             <NewDepartmentDialog open={open} handleClose={() => handleClose()}handleSave={() => handleAdded()}/>
            </>
          )
           
        ):(<></>)
      }
     
      {clicked ?   (entity=="employees" ? 
          (
            <>
           
              <UpdateEmp id={id} table={entity} handleUpdate={handleUpdate}handleDelete={handleDelete} open={clicked} handleClose={handleClose}/>
            
            </>
          )
          :
          (
            <>
            <AddCard id={id} table={entity} handleUpdate={handleUpdate}handleDelete={handleDelete} opend={clicked} handleClose={handleClose}/>
            </>
          )
           
        ):(<></>)}
      <section>
        <Header routes={["staff"]}/>
        {updated ? (
          <>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              updated.
            </Alert>
          </>
        ) : added ? (
          <>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              new row added
            </Alert>
          </>
        ) : deleted ? (
          <>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              deleted
            </Alert>
          </>
        ) : (
          <></>
        )}
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "left" }}
        >
          Staff
        </Typography>
        {/* Cards */}

        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <button
            className="w-[25vw]"
            onClick={() => handleComponent("Employee Details")}
          >
            <CustomCard title="Total Employes" value={empCount} />
          </button>
          <button
            className=" w-[25vw]"
            onClick={() => handleComponent("Department Details")}
          >
            <CustomCard title="Departments" value={depCount} />
          </button>
          <button className="w-[25vw]">
            <CustomCard title="Undefined" value={0} />
          </button>
        </Grid>
        {/* Table */}
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "left" }}
        >
          {title}
        </Typography>
        <Grid container spacing={2} columns={9}>
          <Grid size={{ md: 12, lg: 9 }}>{table}</Grid>
        </Grid>
      </section>
   
    </>
  );
}
