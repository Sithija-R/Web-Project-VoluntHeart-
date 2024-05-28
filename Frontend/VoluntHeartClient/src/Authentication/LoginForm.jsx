import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { googleLoginhandler, userLogin } from "../Storage/Auth/Action";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
    console.log("handle submit", values);
   
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

 

  const onGoogleSuccess = async(credentialResponse)=> {

    const decodeCredentials= jwtDecode(credentialResponse.credential);
    console.log(decodeCredentials)
    
    const googleId = decodeCredentials.sub
    const fullName = decodeCredentials.name;
    const email = decodeCredentials.email;
    const profilePic = decodeCredentials.picture;
  

  
  dispatch(googleLoginhandler(googleId,fullName,email,profilePic))

    
  };


  const onGoogleFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <div className=" px-12 flex-col space-y-8 text-center">
      <h1 className=" font-semibold text-xl ">Login</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full  flex-col space-y-5"
      >
        <TextField
          fullWidth
          multilined
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          multilined={false}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <div className="flex items-end justify-center ">
          <Button
            sx={{
              width: "100%",
              borderRadius: "5px",
              py: "10px",
              backgroundColor: "green",
              "&:hover": { bgcolor: "darkgreen" },
              lg: "2",
              xs: "1",
            }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          className="cursor-pointer text-blue-600"
          onClick={() => navigate("/authentication/signin/")}
        >
          Signup
        </span>
      </p>

      <div class="flex items-center justify-center w-full">
        <div class="flex-grow h-px bg-slate-400 mx-2"></div>
        <span class="whitespace-nowrap text-slate-500">or</span>
        <div class="flex-grow h-px bg-slate-400 mx-2"></div>
      </div>
      <div className=" flex items-center justify-center">
        <GoogleLogin 
          text="continue_with"
                 
                   
          width={500}
          onSuccess={onGoogleSuccess}
          onError={onGoogleFailure}
        />
      
      </div>
      <p className="text-slate-500">Google login only available for donors</p>
      
    </div>
  );
};

export default LoginForm;
