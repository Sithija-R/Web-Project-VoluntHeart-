import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import * as Yup from "yup";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import { googleLoginhandler, donorRegister, fundRegister } from "../Storage/Auth/Action";
import { jwtDecode } from "jwt-decode";

const SignForm = () => {
  const dispatch = useDispatch();

  const [tabvalue, setTabValue] = React.useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const navigate = useNavigate();

  const fundValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is Required"),
    regNumber: Yup.string().required("Registration Number is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const donorValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleDonorSubmit = (values) => {
    dispatch(donorRegister(values));
    console.log("handle submit", values);
  };

  const handleFundSubmit=(values)=>{
    console.log("fundraiser ", values)
    dispatch(fundRegister(values));
  }

const handleClick=()=>{
  console.log("clicked")
}

  const onGoogleSuccess = async (credentialResponse) => {
    const decodeCredentials = jwtDecode(credentialResponse.credential);
    console.log(decodeCredentials);

    const googleId = decodeCredentials.sub;
    const fullName = decodeCredentials.name;
    const email = decodeCredentials.email;
    const profilePic = decodeCredentials.picture;

    dispatch(googleLoginhandler(googleId, fullName, email, profilePic));
  };

  const onGoogleFailure = (response) => {
    console.error("Google login failed:", response);
  };



  const donorFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    
    validationSchema :donorValidationSchema,
    onSubmit:handleDonorSubmit,
    
  });

 
  const fundraiserFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      regNumber: "",
    },
    validationSchema: fundValidationSchema,
    onSubmit:handleFundSubmit,

  });
  


  return (
    <div className=" px-1 flex-col space-y-2 text-center">
      <h1 className=" font-semibold text-xl ">Signup</h1>

      <Box sx={{ width: "100%" }}>
        <TabContext value={tabvalue}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleTabChange}
              aria-label="tabs"
              textColor="primary"
              TabIndicatorProps={{ style: { backgroundColor: "green" } }}
            >
              <Tab label="Donor" value="1" />
              <Tab label="Fundraiser" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <form
              onSubmit={donorFormik.handleSubmit}
              className="w-full  flex-col space-y-2"
            >
              <TextField
                fullWidth
                size="small"
                id="fullName"
                name="fullName"
                label="Full Name"
                value={donorFormik.values.fullName}
                onChange={donorFormik.handleChange}
                onBlur={donorFormik.handleBlur}
                error={
                  donorFormik.touched.fullName &&
                  Boolean(donorFormik.errors.fullName)
                }
                helperText={
                  donorFormik.touched.fullName && donorFormik.errors.fullName
                }
              />
              <TextField
                fullWidth
                size="small"
                id="email"
                name="email"
                label="Email"
                value={donorFormik.values.email}
                onChange={donorFormik.handleChange}
                onBlur={donorFormik.handleBlur}
                error={
                  donorFormik.touched.email && Boolean(donorFormik.errors.email)
                }
                helperText={
                  donorFormik.touched.email && donorFormik.errors.email
                }
              />

              <TextField
                fullWidth
                size="small"
               
                id="password"
                name="password"
                label="Password"
                type="password"
                value={donorFormik.values.password}
                onChange={donorFormik.handleChange}
                onBlur={donorFormik.handleBlur}
                error={
                  donorFormik.touched.password &&
                  Boolean(donorFormik.errors.password)
                }
                helperText={
                  donorFormik.touched.password && donorFormik.errors.password
                }
              />

              <div className="flex items-end justify-center ">
                <Button
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    py: "5px",
                    backgroundColor: "green",
                    "&:hover": { bgcolor: "darkgreen" },
                    lg: "2",
                    xs: "1",
                  }}
                  variant="contained"
                  type="submit"
            
                >
                  Register
                </Button>
               
              </div>
            </form>

            <div className="space-y-3  px-4 mt-5">
              <p>
                Already have an account?
                <span
                  className="cursor-pointer text-blue-600"
                  onClick={() => navigate("/authentication/login/")}
                >
                  {" "}
                  Sign-in
                </span>
              </p>

              <div class="flex items-center justify-center w-full">
                <div class="flex-grow h-px bg-slate-400 mx-2"></div>
                <span class="whitespace-nowrap text-slate-500">or</span>
                <div class="flex-grow h-px bg-slate-400 mx-2"></div>
              </div>
              <div className=" flex items-center justify-center ">
                <GoogleLogin
                  text="signup_with"
                 
                   
                  width={500}
               
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleFailure}
             
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="2">
            <form
              onSubmit={fundraiserFormik.handleSubmit}
              className="w-full  flex-col space-y-2 "
            >
              <TextField
                fullWidth
                size="small"
                id="fullName"
                name="fullName"
                label="Full Name"
                value={fundraiserFormik.values.fullName}
                onChange={fundraiserFormik.handleChange}
                onBlur={fundraiserFormik.handleBlur}
                error={
                  fundraiserFormik.touched.fullName &&
                  Boolean(fundraiserFormik.errors.fullName)
                }
                helperText={
                  fundraiserFormik.touched.fullName &&
                  fundraiserFormik.errors.fullName
                }
              />
              <TextField
                fullWidth
                size="small"
                id="email"
                name="email"
                label="Email"
                value={fundraiserFormik.values.email}
                onChange={fundraiserFormik.handleChange}
                onBlur={fundraiserFormik.handleBlur}
                error={
                  fundraiserFormik.touched.email &&
                  Boolean(fundraiserFormik.errors.email)
                }
                helperText={
                  fundraiserFormik.touched.email &&
                  fundraiserFormik.errors.email
                }
              />
              <TextField
                fullWidth
                size="small"
                id="regNumber"
                name="regNumber"
                label="Registration Number"
                value={fundraiserFormik.values.regNumber}
                onChange={fundraiserFormik.handleChange}
                onBlur={fundraiserFormik.handleBlur}
                error={
                  fundraiserFormik.touched.regNumber &&
                  Boolean(fundraiserFormik.errors.regNumber)
                }
                helperText={
                  fundraiserFormik.touched.regNumber &&
                  fundraiserFormik.errors.regNumber
                }
              />

              <TextField
                fullWidth
                size="small"
                multilined={false}
                id="password"
                name="password"
                label="Password"
                type="password"
                value={fundraiserFormik.values.password}
                onChange={fundraiserFormik.handleChange}
                onBlur={fundraiserFormik.handleBlur}
                error={
                  fundraiserFormik.touched.password &&
                  Boolean(fundraiserFormik.errors.password)
                }
                helperText={
                  fundraiserFormik.touched.password &&
                  fundraiserFormik.errors.password
                }
              />

              <div className="flex items-end justify-center ">
                <Button
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    py: "5px",
                    backgroundColor: "green",
                    "&:hover": { bgcolor: "darkgreen" },
                    lg: "2",
                    xs: "1",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </form>
            <p className="mt-4">
                Already have an account?
                <span
                  className="cursor-pointer text-blue-600"
                  onClick={() => navigate("/authentication/login/")}
                >
                  {" "}
                  Sign-in
                </span>
              </p>
          </TabPanel>
        </TabContext>
      </Box>
      <form action="">
        <input type="text" />
      </form>
    </div>
  );
};

export default SignForm;
