import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";

import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "../../components/Login/CustomIcons";
import AppTheme from "../../theme/AppTheme";
import ColorModeSelect from "../../theme/ColorModeSelect";
import axios from "axios";
import { redirect } from "react-router-dom";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [employes,setEmployes]=React.useState([]);
  const [role,setRole]=React.useState("");
  const [firstTry,setFirstTry]=React.useState(false);
  const [route,setRoute]=React.useState("");
  React.useEffect(()=>{
    axios.get('http://localhost:5555/employees')
    .then((res)=>{
        setEmployes(res.data);
    })
  },[])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const emailRef=React.useRef(email);
  const passwordRef=React.useRef(password);
  const validateInputs = () => {
    emailRef.current=email;
    passwordRef.current=password;
    setFirstTry(true);
   
    const correctEmail=employes.some((employe:any)=>employe.email==email);
    const correctPwd=employes.some((employe:any)=>employe.password==password);
   
    let isValid = true;

    

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else if(!correctEmail){
      setEmailError(true);
      setEmailErrorMessage("invalid email address.");
      isValid = false;
    }else {
      setEmailError(false);
      setEmailErrorMessage("");
     
    }

    if (!password ) {
      setPasswordError(true);
      setPasswordErrorMessage("Please enter your password.");
      isValid = false;
    } else if(!correctPwd){
      setPasswordError(true);
      setPasswordErrorMessage("invalid password.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };
 
 React.useEffect(()=>{
    

 },[email,password])
  React.useEffect(()=>{
   if(firstTry){
     if(emailRef.current!=email){
      setEmailError(false);
      setEmailErrorMessage("");
     }
     if(passwordRef.current!=password){
      setPasswordError(false);
      setPasswordErrorMessage("");
     }
     
   }
    
  },[email,password])

  const handleSubmit = () => {
     
     const valid=validateInputs();
     if(valid){
       const user:any=employes.find((employe:any)=>employe.email==email);
       if(user){
        console.log(user.role);
        
        const role=user.role;
        window.location.href=`/${role}/Dashboard`
       }
     }
    
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <h1 className="text-[5rem] mb-4">Amba Kola Hotel and restuorent</h1>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ ariaLabel: "email" }}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
               
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
          {/*   <Link href={`/${role}/Dashboard`}> */}
              <Button
                fullWidth
                sx={{
                  background: "#2563eb",
                  color: "white",
                  ":hover": {
                    background: "#3b82f6",
                  },
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            {/* </Link> */}
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  href={"/newAdmin"}
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                  underline="none"
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
