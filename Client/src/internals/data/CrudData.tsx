import  React,{useState,useEffect} from "react";
import axios from "axios";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { randomCreatedDate, randomArrayItem } from "@mui/x-data-grid-generator";


export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "E-mail",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 120,
    editable: true,
  },
  {
    field: "contact_no",
    headerName: "Contact No",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    editable: true,
  },
  {
    field: "department",
    headerName: "Department",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    editable: true,
  },
];


interface employe  {
  id: number;
  name: string;
  email: string;
  address: string;
  contact_no: string;
  role: string;
  department: string;
};
export function EmpRows() {
  const testObj=[
    {
      id: 1,
      name: "John",
      email: "dev@gmail.com",
      address: "elm street",
      contact_no: "01124586",
      role: "admin",
      department: "executive",
    }
  ]
  const [empRows, setEmpRows] = useState<employe[]>();
  setEmpRows(testObj);
  /* useEffect(() => {
    axios
      .get("http://localhost:5555/employees")
      .then((res) => {
      
        const newObj=res.data.map((e: any) => ({
          id: e.emp_id,
          name: e.first_name,
          email: e.email,
          address: e.street,
          contact_no: e.contact_no,
          role: e.role,
          department: e.department,
        }));
        
        setEmpRows(newObj);
      })
      .catch((err) => console.log(err));
  }, []); */
/*   const empRows=[
    {
      id: 1,
      name: "John",
      email: "dev@gmail.com",
      address: "elm street",
      contact_no: "01124586",
      role: "admin",
      department: "executive",
    }
  ] */
  return empRows;
}
