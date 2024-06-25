import { Avatar, Box, Button, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Postform from '../Homesection/Postform'
import CloseIcon from "@mui/icons-material/Close";


const LeftSection = () => {

const {auth} = useSelector(store=>store)


const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const modelstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};


  return (
    <div className='  flex-col px-1 h-[86vh]  py-2 rounded-2xl shadow-lg shadow-slate-300 bg-white border-[1.5px]'>

        <div className='flex-col mt-8 px-2  text-center items-center'>
            
            <div className='flex  justify-center'>
            <Avatar
            src={auth.user?.profilePic}
            style={{width:"7rem", height:"7rem" }}
            />

            </div>
            <div className=' border-b-2'>

            <h2 className='mt-5 px-2 text-xl text-gray-700 font-semibold'>{auth.user?.fullName}</h2>
            <p className='text-[#0cac74]'>{auth.user?.donor?"donor":"fundraiser"}</p>
            <p className='text-gray-600 mb-2'>{auth.user?.email}</p>
            </div>
            
            {auth.user?.about?(


            <p className=' p-2 text-center h-[35vh] overflow-y-scroll hideScroll border-b-2 '><span className='text-lg text-gray-700 '>About</span> <br/>
            {auth.user?.about}
            
                 </p>
            ):("")}



                 
        </div>
        <div className='flex-col text-center mt-5 space-y-3'>
            <p className='text-gray-600'>What is happening?</p>

        <Button
            onClick={handleOpen}
            sx={{
              width: "120px",
              borderRadius: "20px",
              py: "10px",
              backgroundColor: "#0ca916",
              "&:hover": { bgcolor: "darkgreen" },
              lg: "2",
              xs: "0",
            }}
            variant="contained"
          >
            Post
          </Button>
        </div>


       
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modelstyle}>
              <div className="flex justify-between text-slate-600 mb-4">
                <h4 className="font-semibold">Create Post</h4>
                <CloseIcon onClick={handleClose} className="cursor-pointer" />
              </div>
              <Postform handleModalClose={handleClose} />
            </Box>
          </Modal>



    </div>
  )
}

export default LeftSection