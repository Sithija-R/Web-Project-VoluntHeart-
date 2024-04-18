import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ProfileModal = () => {
  const style = {

    outline: 'none',
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    px: 3,
    py: 2,
    borderRadius: 4
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(0);


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  //Profile image handling
  const handlePpDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    previewPp(file);
  };

  const handlePpChange = (event) => {
    const file = event.target.files[0];
    previewPp(file);
  };

  const previewPp = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //cover image 
  const handleCoverDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    previewCover(file);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    previewCover(file);
  };

  const previewCover = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("ehandle submit");
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      loction: "",
      about: "",
      coverImage: "",
      profilePhoto: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="">
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between  text-gray-500 font-semibold mb-2">
              <p>Edit Profile</p>
              <CloseIcon aria-label="close" onClick={handleClose} />
            </div>

            <div className="flex  justify-between px-5 py-5 space-x-2  text-gray-500 ">
              <div className="min-w-96 p-1 space-y-4">

                <div className="space-y-2">

                  <label
                    htmlFor="input-Coverfile"
                    onDrop={handleCoverDrop}
                    onDragOver={handleDragOver}
                    className=" w-[450px] min-h-48 max-h-48 flex items-center text-center border-4 border-purple-300 bg-purple-100 rounded-lg bg-cover bg-center">
                    <input className="imageinput" type="file" id="input-Coverfile" onChange={handleCoverChange} hidden />
                    <div className="flex items-center justify-between text-center bg-cover bg-center m-auto">

                      {coverImagePreview ? (
                        <img src={coverImagePreview} alt="Preview" className="flex w-[450px] h-[185px] overflow-hidden rounded-lg object-cover" />
                      ) : (
                        <>
                        <AddPhotoAlternateIcon  fontSize='large'/>
                        <p>Drag and drop or click here to upload cover image</p>
                        </>

                      )}
                    </div>
                  </label>

                </div>
                <div className="space-y-2 w-[10rem] transform -translate-y-24 ml-5">

                  <label htmlFor="input-file" onDrop={handlePpDrop} onDragOver={handleDragOver} >
                    <input type="file" id="input-file" onChange={handlePpChange} hidden />

                    <Avatar className="flex-col text-center" sx={{ width: "10rem", height: "10rem", border: "4px solid purple", color: 'gray' }}>
                      {profileImagePreview ? (
                        <img src={profileImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                      <>
                        <AddPhotoAlternateIcon  fontSize='large'/>
                       <p className="text-sm">Drag and drop or click here to upload profile image</p>
                      </>
                      )}
                     
                    </Avatar >
                  </label>


                </div>

              </div>



              <div className="space-y-2 w-96">
              <TextField fullWidth id="fullName" name="fullName" label="Full Name" 
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.fullName)}
                helperText={formik.touched.name && formik.errors.fullName} />

              <TextField fullWidth multiline rows={3} id="about" name="about" label="About" 
                value={formik.values.about}
                onChange={formik.handleChange}
                error={formik.touched.about && Boolean(formik.errors.about)}
                helperText={formik.touched.about && formik.errors.about} />

              <TextField fullWidth id="email" name="email" label="Email or Website" 
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email} />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ProfileModal;
