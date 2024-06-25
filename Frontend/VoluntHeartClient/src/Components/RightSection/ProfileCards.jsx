import { Avatar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileCards = ({item}) => {

    const navigate = useNavigate();

const handleClick = ()=>{

   navigate(`/profile/${item.userSecret}`)

}

  return (
    <div className='p-2 flex rounded-lg shadow-md cursor-pointer' onClick={handleClick}>
        <div>
            <Avatar sx={{ width: "4rem", height: "4rem", border: "4px solid white" }}>
              <img
                src={item?.profilePic}
                alt="profile pic"
              />
            </Avatar>
        </div>
        <div className='ml-5'>
            <p className='font-semibold text-lg text-gray-700'>{item?.fullName}</p>
            <p className='text-green-600 text-md'>{item?.donor?"donor":"fundraiser"}</p>
        </div>
    </div>
  )
}

export default ProfileCards