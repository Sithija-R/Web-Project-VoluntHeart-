import React from "react";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {  Button } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";

const Postform = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedImage, setselectedImage] = useState("");
  const [uploadVideo,setUploadVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] =useState("");


  const validationSchema = Yup.object().shape({
    content: Yup.string().required("required"),
  });

  const handleSubmit = (values,{resetForm}) => {
    console.log(values);
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      video:""
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = (e) => {
    const imgUrl = e.target.files[0]
    formik.setFieldValue("image", imgUrl);
    setselectedImage(imgUrl);
    setUploadImage(false);
  };

  const handleSelectVideo = (e) => {
    const videoUrl = e.target.files[0];
    formik.setFieldValue("video", videoUrl);
    setSelectedVideo(videoUrl);
    setUploadVideo(false);
  };

  const handleSelectLocation=(e) =>{

  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input type="text" name="content" placeholder="content" className=" w-full border text-lg bg-transparent"
          {...formik.getFieldProps("content")}
        />
        {formik.errors.content && formik.touched.content && (
          <span className="text-red-500">{formik.errors.content}</span>
        )}
      </div>

      <div className="flex justify-between items-center  pt-1">
        <div className="flex space-x-5 items-center">

          <label className="flex items-center space-x-2 rounded-md cursor-pointer">
            <AddPhotoAlternateIcon sx={{ color: "#1d9bf0" }} />
            <input type="file" name="imageFile" id="imagefile"  className="hidden" onChange={handleSelectImage}/>
          </label>

          <label className="flex items-center space-x-2 rounded-md cursor-pointer">
            <VideoLibraryIcon sx={{ color: "#1d9bf0" }} />
            <input type="file" name="videoFile" id="videofile" className="hidden" onChange={handleSelectVideo} />
          </label>

          <label className="flex items-center space-x-2 rounded-md cursor-pointer">
            <LocationOnIcon sx={{ color: "#1d9bf0" }} />
            <input type="file" name="Location"className="hidden" onChange={handleSelectLocation}  />
          </label>

        </div>
        <div>
          <Button sx={{width:"100%",borderRadius:"20px",py:"7px",backgroundColor:"green",'&:hover':{bgcolor:'darkgreen'},lg:"2",xs:"0"}} variant='contained' type="submit">
                    Post
          </Button>
        </div>
        
        
      </div>
    </form>
  );
};

export default Postform;
