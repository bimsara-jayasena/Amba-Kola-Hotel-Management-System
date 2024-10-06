import * as React from 'react';
import { DataGrid, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid';
import {columns,rows}  from '../../internals/data/gridData';
import { hover } from '@testing-library/user-event/dist/hover';

export default function CustomizedDataGrid({columns,rows,onClickHandler,checkBox,onRowSelectionHandler}:any) {
 
  return (
    <DataGrid
      autoHeight
      
      rows={rows}
      columns={columns}
      disableColumnSorting
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
      sx={{":hover":{cursor:'pointer'}}}
      onRowClick={(e)=>onClickHandler(e.id)}
      checkboxSelection={checkBox}
      onRowSelectionModelChange={(newSelection)=>{onRowSelectionHandler(newSelection)}}
      rowSelection={checkBox}
    />
  );
}
