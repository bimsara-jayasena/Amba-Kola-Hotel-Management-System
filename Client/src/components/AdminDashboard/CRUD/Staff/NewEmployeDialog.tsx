import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Save from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import axios from "axios";
import EmployeDataValidate from "./EmployeDataValidate";

type props = {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
};
export default function NewEmployeDialog({
  open,
  handleClose,
  handleSave,
}: props) {
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);

  const [activeStep, setActiveStep] = React.useState(0);

  const [roles, setRoles] = React.useState<any[]>([{}]);
  const [departments, setDepartments] = React.useState<any[]>([]);
  const [employes, setEmployes] = React.useState<any[]>([]);
 /*  const [fnameExist, setFnameExist] = React.useState(false);
  const [lnameExist, setLnameExist] = React.useState(false);
  const [emailExist, setEmailExist] = React.useState(false);
  const [contactExist, setContactExist] = React.useState(false); */

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [postal, setPostal] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmedPwd, setConfirmedPwd] = React.useState("");
  const [isClicked, setClicked] = React.useState(false);
  const [formFilled, setFormFilled] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));


  const {
    firstnameError,
    fnameErrorMessage,
    lastnameError,
    lnameErrorMessage,
    emailError,
    emailErrorMessage,
    contactError,
    contactErrorMessage,
    streetError,
    streetErrorMessage,
    cityError,
    cityErrorMessage,
    stateError,
    stateErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateInputs}=EmployeDataValidate({
      firstName,
      lastName,
      email,
      contact,
      street,
      city,
      postal,
      state,
      department,
      role,
      password,
      confirmedPwd
    });


  React.useEffect(() => {
    axios
      .get("http://localhost:5555/employees")
      .then((res) => {
        setEmployes(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5555/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    const roleobj = departments.map((element: any) => {
      const department: string = element.department;
      const value = [...element.role];

      const obj = {
        [department]: value,
      };
      return obj;
    });
    setRoles(roleobj);
  }, [departments]);
  React.useEffect(() => {
    console.log(employes);
  }, [employes]);
  
 
  const handleSubmit = () => {
   
    let validData = validateInputs();
    if (validData) {
      const obj={
       "first_name":firstName,
       "last_name":lastName,
       "email":email,
       "contact_no":contact,
       "street":street,
       "city":city,
       "postal_code":postal,
       "state":state,
       "department":department,
       "role":role,
       "password":password
     }

    
      axios.post('http://localhost:5555/employees/add',obj)
      .then((res)=>handleSave())
      .catch((err)=>console.log(err));
    }
}
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Employee</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                First name
              </FormLabel>
              <TextField
                fullWidth
                error={firstnameError}
                helperText={fnameErrorMessage}
                id="fname"
                name="fname"
                type="name"
                placeholder="John"
                autoComplete="first name"
                required
                size="small"
                color="warning"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="last-name" required>
                Last name
              </FormLabel>
              <TextField
                fullWidth
                error={lastnameError}
                helperText={lnameErrorMessage}
                id="lname"
                name="lname"
                type="name"
                placeholder="Dev"
                autoComplete="last name"
                required
                size="small"
                color="warning"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="address1" required>
                House number and Street name
              </FormLabel>
              <TextField
                fullWidth
                error={streetError}
                helperText={streetErrorMessage}
                id="street"
                name="street"
                type="street"
                placeholder="house number and street name"
                autoComplete="shipping address-line1"
                required
                size="small"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormLabel htmlFor="city">city</FormLabel>
              <TextField
                fullWidth
                error={cityError}
                helperText={cityErrorMessage}
                id="city"
                name="city"
                type="city"
                placeholder="City"
                autoComplete="City"
                required
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormLabel htmlFor="state" required>
                postal code
              </FormLabel>
              <TextField
                fullWidth
                error={cityError}
                helperText={cityErrorMessage}
                id="postal"
                name="postal"
                type="number"
                placeholder="postal code"
                autoComplete="postal code"
                size="small"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="state" required>
                State
              </FormLabel>
              <TextField
                fullWidth
                error={stateError}
                helperText={stateErrorMessage}
                id="state"
                name="state"
                type="state"
                placeholder="NY"
                autoComplete="State"
                required
                size="small"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="email" required>
                Email
              </FormLabel>
              <TextField
                fullWidth
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                name="email"
                type="email"
                placeholder="New York"
                autoComplete="City"
                required
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel htmlFor="contact">Contact Number</FormLabel>
              <TextField
                fullWidth
                error={contactError}
                helperText={contactErrorMessage}
                id="contact"
                name="contact"
                type="contact"
                placeholder="contact no."
                required
                size="small"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormLabel htmlFor="department">Department</FormLabel>
              <Select
                fullWidth
                id="demo-simple-select"
                value={department}
                label="department"
                onChange={(e) => setDepartment(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Select Department</MenuItem>
                {departments.map((element) => (
                  <MenuItem value={element.department}>
                    {element.department}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select
                fullWidth
                id="role"
                displayEmpty
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">
                  {department == "" ? (
                    <>choose the department first</>
                  ) : (
                    <>select role</>
                  )}
                </MenuItem>
                {roles.map((element) =>
                  element[department]
                    ? element[department].map((element: any, index: number) => (
                        <MenuItem value={element} key={index}>
                          {element}
                        </MenuItem>
                      ))
                    : null
                )}
              </Select>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <FormLabel htmlFor="pwd" required>
                Password
              </FormLabel>
              <TextField
                fullWidth
                error={passwordError}
                helperText={passwordErrorMessage}
                id="password"
                name="password"
                type="password"
                placeholder="12345"
                autoComplete="add new password"
                required
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormLabel htmlFor="confirm" required>
                Confirm Password
              </FormLabel>
              <TextField
                fullWidth
                error={passwordError}
                helperText={passwordErrorMessage}
                id="confirm"
                name="confim"
                type="password"
                placeholder="re-Type password"
                required
                size="small"
                value={confirmedPwd}
                onChange={(e) => setConfirmedPwd(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
