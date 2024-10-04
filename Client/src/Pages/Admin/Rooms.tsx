import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Header from "../../components/AdminDashboard/Header";
import CustomCard from "../../components/AdminDashboard/CustomCard";
import { Box, Button, Collapse } from "@mui/material";
import CustomizedDataGrid from "../../components/AdminDashboard/CustomizedDataGrid";
import GetData from "../../internals/data/RoomsData";
import Grid from "@mui/material/Grid2";
import RoomInfo from "../../components/AdminDashboard/CRUD/Inventory/Rooms/RoomInfoDialog";
import NewRoom from "../../components/AdminDashboard/CRUD/Inventory/Rooms/NewRoomDialog";
import axios from "axios";
import { brand } from "../../theme/themePrimitives";
import NewRoomTypeDialog from "../../components/AdminDashboard/CRUD/Inventory/Rooms/NewRoomTypeDialog";
import NewRoomDialog from "../../components/AdminDashboard/CRUD/Inventory/Rooms/NewRoomDialog";
import RoomInfoDialog from "../../components/AdminDashboard/CRUD/Inventory/Rooms/RoomInfoDialog";
import UpdateStatusDialog from "../../components/AdminDashboard/CRUD/Inventory/Rooms/UpdateStatusDialog";
import TypeInfoDialog from "../../components/AdminDashboard/CRUD/Inventory/Rooms/TypeInfoDialog";
import Alert from "@mui/material/Alert";

export default function Rooms() {
  const [selection, setSelection] = useState("All Rooms");
  const { columns, roomTypeCol, rows, typeRows, fetchData,available,occuipied,checked } = GetData();
  const [roomInfo, setRoomInfo] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState(false);
  const [newType, setNewType] = useState(false);
  const [typeInfo, setTypeInfo] = useState(false);
  const [id, setId] = useState<number>(0);
  const [table, setTable] = useState(<></>);
  const [entity, setEntity] = useState("All Rooms");
  const [selected, setSelected] = useState<any[]>([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [types, setTypes] = useState([]);
  
  const [open, setOpen] = useState(false);

  /* const [occuipied, setOccuipied] = useState<any[]>([]);
  const [available, setAvailable] = useState<any[]>([]);
  const [checked, setChecked] = useState<any[]>([]); */
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string | null>();
  const openRoomInfo = (value: any) => {
    setId(value);
    setRoomInfo(true);
  };

  const onRowSelectionHandler = (index: any) => {
    const list = index;
    setSelected(list);
  };
  useEffect(() => {
    console.log(selected.length);
  }, [selected]);

 /*  useEffect(() => {
    console.log("rows updated");
    const occuipiedRooms = rows.filter(
      (room: any) => room.room_status == "occupied"
    );
    const availableRooms = rows.filter(
      (room: any) => room.room_status == "available"
    );
    const checkedRooms = rows.filter(
      (room: any) => room.room_status == "checked"
    );
    console.log(checkedRooms);
    setOccuipied(occuipiedRooms);
    setAvailable(availableRooms);
    setChecked(checkedRooms);
  }, [rows]); */

  const handleClose = (action: string | null) => {
    fetchData();

    setRoomInfo(false);
    setNewRecord(false);
  
    setNewType(false);
    setNewRecord(false);
    setChangeStatus(false);
    if (action!=null) {
      setAlert(true);
      setAlertMsg(action);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    }
  };

  useEffect(() => {
    switch (entity) {
      case "All Rooms":
        setTable(
          <>
            <div className="w-full flex justify-end mb-1">
              <button
                className="border border-slate-800 rounded w-[15rem] h-[2.5rem] hover:bg-slate-800"
                onClick={() => setNewRecord(true)}
              >
                add new
              </button>
            </div>
            <CustomizedDataGrid
              columns={columns}
              rows={rows}
              onClickHandler={openRoomInfo}
              checkBox={false}
              onRowSelectionHandler={() => {}}
            />
          </>
        );
        break;
      case "Occuipied Rooms":
        setTable(
          <CustomizedDataGrid
            columns={columns}
            rows={occuipied}
            onClickHandler={openRoomInfo}
            checkBox={false}
            onRowSelectionHandler={() => {}}
          />
        );
        break;
      case "Available Rooms":
        setTable(
          <CustomizedDataGrid
            columns={columns}
            rows={available}
            onClickHandler={openRoomInfo}
            checkBox={false}
            onRowSelectionHandler={() => {}}
          />
        );
        break;
      case "Checked Out":
        setTable(
          <>
            {selected.length > 0 ? (
              <>
                <div className="w-full flex justify-end mb-1">
                  <button
                    className="border border-slate-800 rounded w-[15rem] h-[2.5rem] hover:bg-slate-800"
                    onClick={() => setChangeStatus(true)}
                  >
                    make Available
                  </button>
                </div>
              </>
            ) : null}
            <CustomizedDataGrid
              columns={columns}
              rows={checked}
              onClickHandler={openRoomInfo}
              checkBox={true}
              onRowSelectionHandler={onRowSelectionHandler}
            />
          </>
        );
        break;
      case "Room Types":
        setTable(
          <>
            <div className="w-full flex justify-end mb-1">
              <button
                className="border border-slate-800 rounded w-[15rem] h-[2.5rem] hover:bg-slate-800"
                onClick={() => setNewType(true)}
              >
                add new
              </button>
            </div>
            <CustomizedDataGrid
              columns={roomTypeCol}
              rows={typeRows}
              onClickHandler={openRoomInfo}
              checkBox={false}
              onRowSelectionHandler={() => {}}
            />
          </>
        );
        break;
    }
  }, [entity, rows,/*  available, occuipied, checked, */ selected]);

  return (
    <>
      {alert ? (
        <Box
          sx={{
            position: "absolute",
            width: "80rem",
            display: "flex",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <Alert
            variant="filled"
            severity="success"
            sx={{
              position: "absolute",
              width: "50rem",
              zIndex: "99",
              margin: "center",
              background: "#0284c7",
            }}
          >
            
            {alertMsg}
          </Alert>
        </Box>
      ) : null}
      {roomInfo && entity == "Room Types" ? (
        <TypeInfoDialog
          id={id}
          table={entity}
          open={roomInfo}
          handleClose={handleClose}
        />
      ) : roomInfo && entity != "Room Types" ? (
        <RoomInfoDialog
          id={id}
          table={entity}
          open={roomInfo}
          handleClose={handleClose}
        />
      ) : null}
      {newRecord ? (
        <NewRoomDialog open={newRecord} handleClose={handleClose} />
      ) : null}
      {newType ? (
        <NewRoomTypeDialog open={newType} handleClose={handleClose} />
      ) : null}
      {changeStatus ? (
        <UpdateStatusDialog
          open={changeStatus}
          handleClose={handleClose}
          data={selected}
        />
      ) : null}
      <Header routes={["Inventory", "Rooms"]} />
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        Rooms
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <button className="w-[25vw]" onClick={() => setEntity("All Rooms")}>
          <CustomCard title="All Rooms" value={rows.length} />
        </button>
        <button
          className="w-[25vw]"
          onClick={() => setEntity("Occuipied Rooms")}
        >
          <CustomCard title="Occuipied Rooms" value={occuipied.length} />
        </button>
        <button
          className="w-[25vw]"
          onClick={() => setEntity("Available Rooms")}
        >
          <CustomCard title="Available Rooms" value={available.length} />
        </button>
        <button className="w-[25vw]" onClick={() => setEntity("Checked Out")}>
          <CustomCard title="Checked Out" value={checked.length} />
        </button>
        <button className="w-[25vw]" onClick={() => setEntity("Room Types")}>
          <CustomCard title="Room Types" value={typeRows.length} />
        </button>
      </Grid>
      <Box>
        {/* */}
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "left" }}
        >
          {entity}
        </Typography>
        {table}
      </Box>
    </>
  );
}
