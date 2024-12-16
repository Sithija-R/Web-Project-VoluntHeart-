import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MapComponent from "../MapComponents/MapComponent";
import { uploadMedia } from "../Homesection/Utilities/UploadHandle";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Storage/Auth/Action";

const ProfileModal = ({ open, handleClose }) => {
  const { auth } = useSelector((Storage) => Storage);
  const dispatch = useDispatch();

  const style = {
    outline: "none",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: "fit",
    bgcolor: "background.paper",
    boxShadow: 24,
    px: 3,
    py: 2,
    borderRadius: 4,
  };

  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handlePpDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setProfilePic(file);
    const ppUrl = await uploadMedia(file);
    formik.setFieldValue("profilePic", ppUrl);
    setProfileImagePreview(ppUrl);
  };

  const handlePpChange = async (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
    const ppUrl = await uploadMedia(file);
    formik.setFieldValue("profilePic", ppUrl);
    setProfileImagePreview(ppUrl);
  };

  //cover image
  const handleCoverDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setCoverPic(file);
    const coverUrl = await uploadMedia(file);
    formik.setFieldValue("coverImage", coverUrl);
    setCoverImagePreview(coverUrl);
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    setCoverPic(file);
    const coverUrl = await uploadMedia(file);
    formik.setFieldValue("coverImage", coverUrl);
    setCoverImagePreview(coverUrl);
  };

  //Location handling
  const [location, setLocation] = React.useState(null);
  const [address, setAddress] = useState("");

  const handleMapClick = (clickedLocation) => {
    setLocation(clickedLocation);
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${clickedLocation.lat}&lon=${clickedLocation.lng}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAddress(data.address));
  };

  const handleLocationUpload = () => {
    formik.setFieldValue("userLocation", location);
  };

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log("handle submit", values);
    handleClose();
    setLocation(null);
  };

  const formik = useFormik({
    initialValues: {
      fullName: auth.user.fullName,
      website: auth.user.website,
      userLocation: "",
      about: auth.user.about,
      coverImage: "",
      profilePic: "",
    },
    onSubmit: handleSubmit,
  });

  const handleImageUpload = (e) => {
   
    const { name } = e.target;
    const file = e.target.files[0];
    formik.setFieldValue(name, file);
    
  };

  return (
    <div className=" bg-slate-500">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit} className="flex-col">
            <div className="flex items-center justify-between   text-gray-500 font-semibold mb-2">
              <p>Edit Profile</p>
              <CloseIcon
                aria-label="close"
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:w-full justify-around px-3 py-5 space-x-2 h-[77vh] overflow-y-scroll hideScrollBar">
              <div className="min-w-96 p-1 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="coverImage"
                    onDrop={handleCoverDrop}
                    onDragOver={handleDragOver}
                    className=" w-[450px] min-h-48 max-h-48 flex items-center text-center border-4 border-purple-300 bg-purple-100 rounded-lg bg-cover bg-center"
                  >
                    <input
                      name="coverImage"
                      className="imageinput"
                      type="file"
                      id="coverImage"
                      onChange={(event) => {
                        handleCoverChange(event);
                        handleImageUpload(event);
                      }}
                      hidden
                    />
                    <div className="flex items-center justify-between text-center bg-cover bg-center m-auto">
                      {coverPic ? (
                        coverImagePreview ? (
                          <img
                            src={coverImagePreview}
                            alt="Preview"
                            className="flex w-[450px] h-[185px] overflow-hidden rounded-lg object-cover"
                          />
                        ) : (
                          <img
                            src="https://cdn.dribbble.com/users/1415337/screenshots/10781083/media/0466184625e53796cfeb7d5c5918dec8.gif"
                            alt="Preview"
                            className="flex w-[450px] h-[185px] overflow-hidden rounded-lg object-cover"
                          />
                        )
                      ) : (
                        <>
                          <AddPhotoAlternateIcon fontSize="large" />
                          <p>
                            Drag and drop or click here to upload cover image
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                <div
                  className="space-y-2 w-[10rem] transform -translate-y-24 ml-5"
                  name="profilePhoto"
                >
                  <label
                    htmlFor="pPhoto"
                    name="profilePhoto"
                    onDrop={handlePpDrop}
                    onDragOver={handleDragOver}
                  >
                    <input
                      type="file"
                      id="pPhoto"
                      name="profilePhoto"
                      onChange={(event) => {
                        handlePpChange(event);
                        handleImageUpload(event);
                      }}
                      hidden
                    />

                    <Avatar
                      className="flex-col text-center"
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid rgb(216 180 254)",
                        color: "gray",
                        bgcolor: "rgb(243 232 255)",
                      }}
                    >
                      {profilePic ? (
                        profileImagePreview ? (
                          <img
                            src={profileImagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="https://cdn.dribbble.com/users/1415337/screenshots/10781083/media/0466184625e53796cfeb7d5c5918dec8.gif"
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <>
                          <AddPhotoAlternateIcon fontSize="large" />
                          <p className="text-sm">
                            Drag and Drop or Click Here To Upload Profile Image
                          </p>
                        </>
                      )}
                    </Avatar>
                  </label>
                </div>

                <div className="space-y-2 py-7  items-start w-96 -translate-y-24 ">
                  <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    error={
                      formik.touched.name && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    id="about"
                    name="about"
                    label="About"
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    error={formik.touched.about && Boolean(formik.errors.about)}
                    helperText={formik.touched.about && formik.errors.about}
                  />

                  <TextField
                    fullWidth
                    id="website"
                    name="website"
                    label="Email or Website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.website && Boolean(formik.errors.website)
                    }
                    helperText={formik.touched.website && formik.errors.website}
                  />
                </div>
              </div>
              <div className=" w-96 space-y-1">
                <p>Add Location</p>

                <MapComponent
                  selectedLocation={location}
                  onMapClick={handleMapClick}
                  style={{ borderRadius: "2px" }}
                />
                <div className="flex justify-between">
                  <p>Selected Location:</p>
                  <Button onClick={handleLocationUpload}>set</Button>
                </div>
                <div className="-translate-y-4">
                  <p>{address?.village} </p>
                  <p>{address?.town} </p>
                  <p>{address?.city} </p>
                  <p>{address?.country}</p>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end text-lg font-semibold">
              <Button
                type="submit"
                sx={{ fontWeight: 500, fontSize: "medium" }}
              >
                save
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ProfileModal;
