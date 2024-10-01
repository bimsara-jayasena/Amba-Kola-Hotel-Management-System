import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  GridColumnGroupingModel
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Collapse } from "@mui/material";
import { rows } from "../../internals/data/gridData";

var isUpdate: boolean = false;

interface employe {
  id: number;
  name: string;
  email: string;
 /* add adress */
  contact_no: string;
  role: string;
  department: string;
}
interface EditToolbarProps {
  rows: employe[];
  setIsNew:React.Dispatch<React.SetStateAction<boolean>>;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { rows,setIsNew, setRows, setRowModesModel } = props;

  const handleClick = () => {
    //get existing row ids
    const ids = rows.map((row) => row.id);
    const id = ids[ids.length - 1] + 1;
    setIsNew(true);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        email: "",
       /* add adress */
        contact_no: "",
        role: "",
        department: "",
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
  
export class ColumnGroup{
  private  columnGroupingModel: GridColumnGroupingModel | undefined;
  setGroup(columnGroup:GridColumnGroupingModel){
   
      this.columnGroupingModel=columnGroup;
  }
  getColumnGroupModel():GridColumnGroupingModel | undefined{
   
    return this.columnGroupingModel;
  }
}
export default function CrudDataGrid({ initialRows, initialColumns, onAdded, onUpdate, onDelete }: any) {
  const [rows, setRows] = React.useState(initialRows);
  const [isNew, setIsNew] = React.useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const [columnGroup,setColumnGroup]=React.useState<GridColumnGroupingModel|undefined>();
  const groupModel=new ColumnGroup();
  const model=groupModel.getColumnGroupModel();
  
  React.useEffect(()=>{setColumnGroup(model)},[groupModel])
  /* const columnGroupingModel: GridColumnGroupingModel = [
  
  {
    groupId: 'Address',
    children: [{ field: 'street' }, { field: 'city' },{ field: 'state' }],
      
   },
 ]; */


  React.useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setIsNew(false);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      
     if(isNew){
       onAdded(true);
       setTimeout(()=>{
        onAdded(false);setIsNew(false);
       },1000)
     }else{
      onUpdate(true);
      setTimeout(()=>{
        onUpdate(false)
       },1000)
     }
   
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
    onDelete(true);
    setTimeout(() => {
      onDelete(false);
    }, 1000);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };

    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    alert("updated row id:"+newRow.id);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        columnGroupingModel={columnGroup}
        columnGroupHeaderHeight={36}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { rows,setIsNew, setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
