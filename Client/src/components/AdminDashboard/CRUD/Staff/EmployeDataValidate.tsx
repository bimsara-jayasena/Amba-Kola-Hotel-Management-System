import * as React from "react";
import axios from "axios";
type employe={
    firstName:string,
    lastName:string,
    email:string,
    contact:string,
    street:string,
    city:string,
    postal:string,
    state:string,
    department:string,
    role:string,
    password:string,
    confirmedPwd:string
}
export default function EmployeDataValidate({firstName,lastName,email,contact,street,city,state,postal,department,role,password,confirmedPwd}:employe){
    const [departments, setDepartments] = React.useState<any[]>([]);
    const [employes, setEmployes] = React.useState<any[]>([]);
    const [formFilled, setFormFilled] = React.useState(false);
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

  const checkExistValues = () => {
    if (employes) {
      let fnameExist = employes.some(
        (employe) => employe.first_name == firstName
      );
      let lnameExist = employes.some(
        (employe) => employe.last_name == lastName
      );
      let emailExist = employes.some((employe) => employe.email == email);
      let contactExist = employes.some(
        (employe) => employe.contact_no == contact
      );
      let pwdExist = employes.some(
        (employe) => employe.password == password
      );
      return { fnameExist, lnameExist, emailExist, contactExist,pwdExist };
    }
    return {
      fnameExist: false,
      lnameExist: false,
      emailExist: false,
      contact: false,
      pwdExist:false
    };
  };
  const validateInputs = () => {
    setFormFilled(true);
    let isValid = true;

    const { fnameExist, lnameExist, emailExist, contactExist ,pwdExist} =checkExistValues();
   
    if (firstName == "") {
      setFnameError(true);
      setFnameErrorMessage("Please enter your first name");
      isValid = false;
    } else if (fnameExist && lnameExist) {
      setFnameError(true);
      setFnameErrorMessage("This user name is already exist");
      isValid = false;
    } else {
      setFnameError(false);
     /*  isValid = true; */
      setFnameErrorMessage("");
    }

    if (lastName == "") {
      setLnameError(true);
      setLnameErrorMessage("Please enter your last name");
      isValid = false;
    } else if (fnameExist && lnameExist) {
      setLnameError(true);
      setLnameErrorMessage("This user name is already exist");
      isValid = false;
    } else {
      setLnameError(false);
      setLnameErrorMessage("");
     /*  isValid = true; */
    }
   /*  if (street == "") {
      setStreetError(true);
      setStreetErrorMessage("Please enter street name and number");
      isValid = false;
    } else {
      setStreetError(false);
      setStreetErrorMessage("");
      isValid = true;
    } */
    if (street == "") {
      setStreetError(true);
      setStreetErrorMessage("Please enter street name and number");
      isValid = false;
    } else {
      setStreetError(false);
      setStreetErrorMessage("");
     /*  isValid = true; */
    }

    if (city == "") {
      setCityError(true);
      setCityErrorMessage("Please enter City name");
      isValid = false;
    } else {
      setCityError(false);
      setCityErrorMessage("");
     /*  isValid = true; */
    }
    if (state == "") {
      setStateError(true);
      setStateErrorMessage("Please enter State name");
      isValid = false;
    } else {
      setStateError(false);
      setStateErrorMessage("");
     /*  isValid = true; */
    }
   /*  if (state == "") {
      setStateError(true);
      setStateErrorMessage("Please enter State name");
      isValid = false;
    } else {
      setStateError(false);
      setStateErrorMessage("");
      isValid = true;
    }
    if (state == "") {
      setStateError(true);
      setStateErrorMessage("Please enter State name");
      isValid = false;
    } else {
      setStateError(false);
      setStateErrorMessage("");
      isValid = true;
    }
 */
    if (contact == "") {
      setContactError(true);
      setContactErrorMessage("Please enter Contact Number");
      isValid = false;
    } else if (contactExist) {
      setContactError(true);
      setContactErrorMessage("This Contact number is already exist");
      isValid = false;
    } else {
     /*  isValid = true; */
      setContactError(false);
      setContactErrorMessage("");
    }
    if (email == "" || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else if (emailExist) {
      setEmailError(true);
      setEmailErrorMessage("This Email address is already exist");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
     /*  isValid = true; */
    }

    if (password == "" || password.length < 2) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else if (password != confirmedPwd) {
      setPasswordError(true);
      setPasswordErrorMessage("Passwords doesn't match.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
     /*  isValid = true; */
    }
  
   
      return isValid;
   
  };

 /*  const handleSubmit = () => {
   
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
  } */

  React.useEffect(() => {
    if (formFilled) {
      validateInputs();
    }
  }, [
    firstName,
    lastName,
    email,
    contact,
    street,
    city,
    postal,
    state,
    password,
    confirmedPwd,
  ]);

 return {
  firstnameError,
  fnameErrorMessage,
  lastnameError,
  lnameErrorMessage,
  emailError,
  emailErrorMessage,
  streetError,
  streetErrorMessage,
  cityError,
  cityErrorMessage,
  stateError,
  stateErrorMessage,
  contactError,
  contactErrorMessage,
  passwordError,
  passwordErrorMessage,
  department,
  validateInputs,


 }
}