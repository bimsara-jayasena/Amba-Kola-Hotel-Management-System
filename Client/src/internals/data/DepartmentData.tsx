import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

function renderStatus(status: 'Online' | 'Offline') {
  const colors: { [index: string]: 'success' | 'default' } = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const depCol: GridColDef[] = [
  { field: 'department', headerName: 'Department',headerAlign: 'center',align: 'center', flex: 1.5, minWidth: 100, editable:true},
  {field: 'quantity', headerName: 'Employees quantity',headerAlign: 'center',align: 'center',flex: 1,minWidth: 100, editable:true},
  
];


interface department{
  id:number,
  department:string,
  quantity:number
}
export function useDepRows(){
   
    const[depData,setDepDataRows]=React.useState<department[]>([]);
    const[depDataLoading,setDepDataLoading]=React.useState(true);
   const fetchDepData=()=>{
      axios.get('http://localhost:5555/departments')
      .then((res)=>{
        const newObj=res.data.map((element:any)=>({
          id:element.dep_id,
          department:element.department,
          quantity:element.emp_quantity,
        }));
        setDepDataRows(newObj);
        console.log('data is re-renderd');
      })
      .catch((error)=>{
          console.log(error);
      })
      .finally(()=>{setDepDataLoading(false)})
    };
    React.useEffect(()=>fetchDepData(),[]);
   
    return {depData,depDataLoading,fetchDepData};
}