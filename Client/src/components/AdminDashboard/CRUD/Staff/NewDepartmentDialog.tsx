import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Save from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

type props = {
  open: boolean;
  handleClose: (prop: boolean) => void;
  handleSave: (value: boolean) => void;
};
export default function NewDepartmentDialog({
  open,
  handleClose,
  handleSave,
}: props) {
  const [department, setDepartment] = React.useState("");
  const [roles, setRoles] = React.useState<string[]>([""]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const handleChange = (id: number, value: string) => {
    const newArray = [...roles];
    newArray[id] = value;
    setRoles(newArray);
  };
  const addRole = () => {
    setRoles([...roles, ""]);
  };
  const removeRole = (id: number) => {
    const updatedList = [...roles];
    updatedList.splice(id, 1);
    setRoles(updatedList);
  };
  const handleSubmit = () => {
    const emptyValue = roles.some((role) => role === "");
    if (emptyValue) {
      alert("Values Cannot be Empty!");
    } else {
      const object = {
        department: department,
        emp_quantity: 0,
        roles: roles,
      };
      axios
        .post("http://localhost:5555/departments/add", object)
        .then((res) => {
          handleSave(true);
        })
        .catch((error) => console.log(error.message));
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose(false);
          },
        }}
      >
        <DialogTitle>Add New Departments</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="department">Department</FormLabel>
              <TextField
                required
                id="deparment"
                name="department"
                type="text"
                fullWidth
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                sx={{ marginBottom: "2rem" }}
              />
            </Grid>
          </Grid>

          <Divider />
          <Typography sx={{ color: "white" }}>Add Roles</Typography>
          <Stack spacing={2}>
            {roles.map((element, index) => (
             
               <Box sx={{background:'#475569', borderRadius:'10px',}}>
                 
                <TextField
                  id={index.toString()}
                  fullWidth={index == 0 ? true : false}
                  value={element}
                  onChange={(e) => handleChange(index, e.target.value)}
                />

                {index > 0 ? (
                  <Button onClick={() => removeRole(index)}>Remove</Button>
                ) : (
                  <></>
                )}
               </Box>
              
            ))}
          </Stack>
          <Button onClick={addRole}>add role</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
