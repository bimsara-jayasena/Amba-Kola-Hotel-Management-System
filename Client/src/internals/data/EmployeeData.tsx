import  React,{useState,useEffect} from "react";
import axios from "axios";
import { GridRowsProp, GridColDef,GridColumnGroupingModel } from "@mui/x-data-grid";
import { randomCreatedDate, randomArrayItem } from "@mui/x-data-grid-generator";
import { ColumnGroup } from "../../components/AdminDashboard/CrudDataGrid";

interface employe {
  id: number;
  fname: string;
  email: string;
  contact_no: string;
  role: string;
  department: string;
  available:string;
};
export const columns: GridColDef<(typeof rows)[number]>[] = [

  {
    field: 'fname',
    headerName: 'Full Name',
    flex:1,
    width: 150,
    
  },
  {
    field: 'email',
    headerName: 'Email',
    flex:1,
    width: 150,
   
  },
  {
    field: 'contact_no',
    headerName: 'contact',
    flex:1,
    width: 110,
    
  },
  
  {
    field: 'department',
    headerName: 'Department',
    flex:1,
    width: 160,
  
  },
  {
    field: 'role',
    headerName: 'Role',
    flex:1,
    width: 160,
  
  },
  {
    field: 'available',
    headerName: 'Availability',
    flex:1,
    width: 160,
  
  },


];

export const rows = [
  { id: 1, 
    fname:"",
    email:"",
    contact_no:"",
    role:"",
    department:"",
    available:"" },
  
];



export function EmpRows() {
 
  const [empData, setEmpData] = useState<employe[]>([]);
  const [empDataLoading,setEmpDataLoading]=useState(true);
  const fetchEmpData=() => {
       axios.get("http://localhost:5555/employees")
        .then((res)=>{
          const newObj = res.data.map((e: any) => ({
            id: e.emp_id,
            fname: e.first_name+" "+e.last_name,
            email: e.email,
            contact_no: e.contact_no,
            role: e.role,
            department: e.department,
            available:"yes"
          }));
          setEmpData(newObj);
        })
      .catch ((err)=>{
        console.log(err);
      })
      .finally(()=>setEmpDataLoading(false));
  };
  useEffect(()=>fetchEmpData(),[]);
  return {empData,empDataLoading,fetchEmpData};
}
