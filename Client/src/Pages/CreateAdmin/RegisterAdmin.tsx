import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "../../components/AdminRegister/AddressForm";
import getCheckoutTheme from "../../theme/getCheckoutTheme";
import Info from "../../components/AdminRegister/Info";
import InfoMobile from "../../components/AdminRegister/InfoMobile";
import TemplateFrame from "./TemplateFrame";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import SuccessDialog from './SuccessDialog';
import Link from "@mui/material/Link";

const steps = ["Shipping address", "Payment details", "Review your order"];
function getStepContent() {
  return <AddressForm />;
}
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));
export default function RegisterAdmin() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [open,setOpen]=React.useState(false);


 
  /* Validate informations */
  const [firstnameError, setFnameError] = React.useState(false);
  const [fnameErrorMessage, setFnameErrorMessage] = React.useState("");

  const [lastnameError, setLnameError] = React.useState(false);
  const [lnameErrorMessage, setLnameErrorMessage] = React.useState("");

  const [streetError, setStreetError] = React.useState(false);
  const [streetErrorMessage, setStreetErrorMessage] = React.useState("");

  const [cityError, setCityError] = React.useState(false);
  const [cityErrorMessage, setCityErrorMessage] = React.useState("");

  const [stateError, setStateError] = React.useState(false);
  const [stateErrorMessage, setStateErrorMessage] = React.useState("");
  
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  
  const [contactError, setContactError] = React.useState(false);
  const [contactErrorMessage, setContactErrorMessage] = React.useState("");

  
  
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [valid,setValid]=React.useState(false);
  const validateInputs = () => {
    
    const fname = document.getElementById("fname") as HTMLInputElement;
    const lname = document.getElementById("lname") as HTMLInputElement;
    const street = document.getElementById("street") as HTMLInputElement;
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
    const contact = document.getElementById("contact") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const confirm = document.getElementById("confirm") as HTMLInputElement;
    var isValid=true;

    

    if (!fname.value) {
      setFnameError(true);
      setFnameErrorMessage("Please enter your first name");
      setValid(false);
    } else {
      setFnameError(false);
      setFnameErrorMessage("");
      setValid(true);
    }

    if (!lname.value) {
      setLnameError(true);
      setLnameErrorMessage("Please enter your last name");
      setValid(false);
    } else {
      setLnameError(false);
      setLnameErrorMessage("");
      setValid(false);
    }

    if (!street.value) {
      setStreetError(true);
      setStreetErrorMessage("Please enter street name and number");
      setValid(false);
    } else {
      setStreetError(false);
      setStreetErrorMessage("");
      setValid(true);
    }

    if (!city.value) {
        setCityError(true);
        setCityErrorMessage("Please enter City name");
        setValid(false);
      } else {
        setCityError(false);
        setCityErrorMessage("");
        setValid(true);
      }
    
      if (!state.value) {
        setStateError(true);
        setStateErrorMessage("Please enter State name");
        setValid(false);
      } else {
        setStateError(false);
        setStateErrorMessage("");
        setValid(true);
      }

      if (!contact.value) {
        setContactError(true);
        setContactErrorMessage("Please enter Contact Number");
        setValid(false);
      } else {
        setContactError(false);
        setContactErrorMessage("");
      }
      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage("Please enter a valid email address.");
        setValid(false);
        isValid = false;
      } else {
        setEmailError(false);
        setEmailErrorMessage("");
        setValid(true);
      }
    

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      setValid(false);
      isValid = false;
    } else if(password.value!=confirm.value) {
        setPasswordError(true);
        setPasswordErrorMessage("Passwords doesn't match.");
        setValid(false);
        isValid = false;
    }else {
        setPasswordError(false);
        setPasswordErrorMessage("");
        setValid(true);
      }

      handleClickOpen();
    return isValid;

  };
  const handleClickOpen=()=>{
    if(valid){
      setOpen(true);
    }
   
 }
 const handleClose=()=>{
   setOpen(!open);
 }


  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  //   const handleBack = () => {
  //     setActiveStep(activeStep - 1);
  //   };
  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <CssBaseline enableColorScheme />

        <Grid container sx={{ height: "94vh",}}>
            <SuccessDialog open={open} handleClose={handleClose}/>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              justifyContent: "center",
              alignItems: "center",
              pt: 0,
              px: 10,
              gap: 4,
            }}
          >
            <Typography variant="body1">
              <h1 className="text-[2rem]">
                {" "}
                Welcome to Amba kola Hotel & Resturont
              </h1>
            </Typography>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              height: "900px",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "center",
              pt: { xs: 1, sm: 1 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 1, md: 1 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Typography variant="body1">
                  <h1 className="text-[2rem] "> Create New Account</h1>
                </Typography>
              </Box>
            </Box>
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Welcome to Amba kola Hotel & Resuerent
                </Typography>
              </CardContent>
            </Card>
            
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                  maxWidth: { sm: "100%", md: 600 },
                  maxHeight: "620px",
                  gap: { xs: 5, md: "none" },
                  
                }}
              >
                <React.Fragment>
                
                  <Grid container spacing={3}>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                      <FormLabel htmlFor="first-name" required>
                        First name
                      </FormLabel>
                      <TextField
                        error={firstnameError}
                        helperText={fnameErrorMessage}
                        id="fname"
                        name="first-name"
                        type="name"
                        placeholder="John"
                        autoComplete="first name"
                        required
                        size="small"
                        color="warning"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                      <FormLabel htmlFor="last-name" required>
                        Last name
                      </FormLabel>
                      <TextField
                        error={lastnameError}
                        helperText={lnameErrorMessage}
                        id="lname"
                        name="first-name"
                        type="name"
                        placeholder="John"
                        autoComplete="first name"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                      <FormLabel htmlFor="address1" required>
                       House number and Street name
                      </FormLabel>
                      <TextField
                        error={streetError}
                        helperText={streetErrorMessage}
                        id="street"
                        name="street"
                        type="street"
                        placeholder="house number and street name"
                        autoComplete="shipping address-line1"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 6 }}>
                      <FormLabel htmlFor="city">city</FormLabel>
                      <TextField
                        id="city"
                        name="city"
                        type="city"
                        placeholder="City"
                        autoComplete="City"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 6 }}>
                      <FormLabel htmlFor="state" required>
                        postal code
                      </FormLabel>
                      <TextField
                       error={cityError}
                       helperText={cityErrorMessage}
                        id="postal"
                        name="postal"
                        type="number"
                        placeholder="postal code"
                        autoComplete="postal code"
                       
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                      <FormLabel htmlFor="state" required>
                        State
                      </FormLabel>
                      <TextField
                       error={stateError}
                       helperText={stateErrorMessage}
                        id="state"
                        name="state"
                        type="state"
                        placeholder="NY"
                        autoComplete="State"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                      <FormLabel htmlFor="email" required>
                        Email
                      </FormLabel>
                      <TextField
                       error={emailError}
                       helperText={emailErrorMessage}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="New York"
                        autoComplete="City"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                      <FormLabel htmlFor="contact">Contact Number</FormLabel>
                      <TextField
                      error={contactError}
                      helperText={contactErrorMessage}
                        id="contact"
                        name="contact"
                        type="contact"
                        placeholder="contact no."
                        required
                        size="small"
                      />
                    </FormGrid>
                  {/* This input fields should be drop down list */}
                    <FormGrid size={{ xs: 6 }}>
                      <FormLabel htmlFor="confirm" required>
                       Department
                      </FormLabel>
                      <TextField
                      
                        id="dep"
                        name="department"
                        type="text"
                        placeholder="department"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 6 }}>
                      <FormLabel htmlFor="role" required>Role</FormLabel>
                      <TextField
                     
                      
                        id="role"
                        name="role"
                        type="text"
                        placeholder="12345"
                        autoComplete="add new password"
                        required
                        size="small"
                      ></TextField>
                    </FormGrid>
                  {/*  */}
                    <FormGrid size={{ xs: 6 }}>
                      <FormLabel htmlFor="pwd" required>
                        Password
                      </FormLabel>
                      <TextField
                      error={passwordError}
                      helperText={passwordErrorMessage}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="12345"
                        autoComplete="add new password"
                        required
                        size="small"
                      />
                    </FormGrid>
                    <FormGrid size={{ xs: 6 }}>
                      <FormLabel htmlFor="confirm" required>
                        Confirm Password
                      </FormLabel>
                      <TextField
                       error={passwordError}
                       helperText={passwordErrorMessage}
                        id="confirm"
                        name="confimr"
                        type="password"
                        placeholder="re-Type password"
                        required
                        size="small"
                      />
                    </FormGrid>
                    
                    
                  </Grid>

                
                  <Box
                    sx={[
                      {
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 5, sm: 0 },
                       
                        mb: "60px",
                      },
                    ]}
                  >
                    <Button
                      fullWidth
                      sx={{
                        background: "#2563eb",
                        color: "white",
                        ":hover": {
                          background: "#3b82f6",
                        },
                      }}
                      onClick={validateInputs}
                    >
                      Sign up
                    </Button>
                   
                  </Box>
                </React.Fragment>
              </Box>
             
          </Grid>
        </Grid>
      </ThemeProvider>
      
    </TemplateFrame>
  );
}
