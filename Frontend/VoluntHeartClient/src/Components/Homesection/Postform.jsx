import React, { useEffect } from "react";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import MapComponent from "../MapComponents/MapComponent";
import { v4 as uuidv4 } from 'uuid';
import MediaCarousel from "./Utilities/MediaCarousel";
import { uploadMedia } from "./Utilities/UploadHandle";
import { useDispatch } from "react-redux";
import { createPost } from "../../Storage/Posts/Action";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';


const Postform = ({handleModalClose}) => {

  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedImage, setselectedImage] = useState([]);
  const [uploadVideo, setUploadVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState([]);

  const [imgPreview, setImgPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLocation(null);
  };

  const modelstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: "12px",
    
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(createPost(values));
    handleModalClose();
    console.log(values);
    resetForm();
    setselectedImage([]);
    selectedVideo([]);
   
   
   
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      images: [],
      videos: [],
      location: ""
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (e) => {
   
    const imgs = Array.from(e.target.files);

    const uploadedImages = await Promise.all(imgs.map(async (file) => {
      console.log("file ",file)
      const imgUrl = await uploadMedia(file);
      return imgUrl;
    }));

    setselectedImage(uploadedImages);

   
   
    formik.setFieldValue("images", uploadedImages);
   
  };


  const handleSelectVideo = async (e) => {
    const video = Array.from(e.target.files);
    const uploadedVideos = await Promise.all(video.map(async (file) => {
      console.log("file ",file)
      const videoUrl = await uploadMedia(file);
      return videoUrl;
    }));
    
    setSelectedVideo(uploadedVideos );
    formik.setFieldValue("videos", uploadedVideos);
  };


  
  //Location handling
  const [location, setLocation] = React.useState(null);
  const [address, setAddress] = useState("");

  const handleMapClick = (clickedLocation) => {
    setLocation(clickedLocation);
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${clickedLocation.lat}&lon=${clickedLocation.lng}`;
    const dt = fetch(url)
      .then((res) => res.json())
      .then((data) => setAddress(data.address));
  };

  const handleSelectLocation = () => {

    formik.setFieldValue("location",location)
  };

  useEffect(() => {
    console.log('selectedImage updated: ', selectedImage);
  }, [selectedImage]);
  
  useEffect(() => {
    console.log('selectedvideo updated: ', selectedVideo);
  }, [selectedVideo]);
  
  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="py-3 mb-5">
        <TextField
          fullWidth
          multiline
          rows={3}
          id="content"
          name="content"
          label="Content"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
      </div>
     
  

<div className="flex">

<div className="h-1/3 w-1/2">

    <MediaCarousel mediaItems={selectedImage.map((file) => ({ type: 'image', url: file, name: file.name }))} />
</div>
<div className="h-1/3 w-1/2">

    <MediaCarousel mediaItems={selectedVideo.map((file) => ({ type: 'video', url: file, name: file.name }))} />
</div>
</div>
  
        
   

      <div className="flex justify-between items-center  pt-5">
        <div className="flex space-x-5 items-center">
          <label className="flex items-center space-x-2 rounded-md cursor-pointer">
            <AddPhotoAlternateIcon sx={{ color: "#1d9bf0" }} />
            <input
              type="file"
              multiple
              name="imageFile"
              id="imagefile"
              className="hidden"
              onChange={handleSelectImage}
            />
          </label>

          <label className="flex items-center space-x-2 rounded-md cursor-pointer">
            <VideoLibraryIcon sx={{ color: "#1d9bf0" }} />
            <input
              type="file"
              multiple
              name="videoFile"
              id="videofile"
              className="hidden"
              onChange={handleSelectVideo}
            />
          </label>
    <AddLocationAltIcon
    sx={{ color: "#1d9bf0" }}
    onClick={handleOpen}
    className="cursor-pointer"/>
        
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modelstyle}>
              <div className="flex justify-end text-slate-700 mb-5">
                <CloseIcon onClick={handleClose} className="cursor-pointer" />
              </div>
              <div>
                <MapComponent
                  selectedLocation={location}
                  onMapClick={handleMapClick}
                />
              </div>
              <div className="flex justify-between">
                {location && (
                  <div className="">
                    <p>Selected Location:</p>
                    <p>{address?.village} </p>
                  <p>{address?.town} </p>
                  <p>{address?.city} </p>
                  <p>{address?.country}</p>
                  </div>
                )}
                <Button
                  onClick={(e) => {
                    handleSelectLocation(e);
                    handleClose(e);
                  }}
                >
                  Set Location
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
        <div>
          <Button
          
            sx={{
              width: "100%",
              borderRadius: "20px",
              py: "7px",
              backgroundColor: "green",
              "&:hover": { bgcolor: "darkgreen" },
              lg: "2",
              xs: "0",
            }}
            variant="contained"
            type="submit"
          >
            Post
          </Button>
        </div>
      </div>
     
    </form>
  );
};

export default Postform;
