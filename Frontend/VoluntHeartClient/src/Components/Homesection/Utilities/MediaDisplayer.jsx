import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux';
import { deleteMedia } from '../../../Storage/Posts/Action';

const MediaDisplayer = ({postuniqueKey,mediaItem}) => {

  const dispatch = useDispatch();

const handleDelete=()=>{
  dispatch(deleteMedia(postuniqueKey,mediaItem?.id))
    console.log("delete", postuniqueKey)
}

  return (
   
    <div className='w-72 relative'>
      <div onClick={handleDelete} className='absolute right-2 top-2 bg-slate-50 rounded-full cursor-pointer '>

      <CloseIcon/>
      </div>
          
           
              {mediaItem.type === "image" ? (
                <img
                  src={mediaItem.url}
                  alt={mediaItem.name}
                  className="max-h-96 border border-gray-200 p-1 rounded-md m-auto"
                />
              ) : mediaItem.type === "video" ? (
                <video
                  controls
                  className="max-h-96 w-full border border-gray-600 p-1 rounded-md m-auto"
                >
                  <source src={mediaItem.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
       
          
        
  
    </div>



  )
}

export default MediaDisplayer