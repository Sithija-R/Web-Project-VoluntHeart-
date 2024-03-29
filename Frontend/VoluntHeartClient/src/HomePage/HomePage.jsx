import React from 'react'
import {Grid} from "@mui/material"

const HomePage = () => {
  return (
    <Grid container xs={12} className='px-5 lg:px-36 justify-between'>

      <Grid item xs={0} lg={2.5} className=' lg:block w-full relative'>
        <p className='text-center'>left</p>
      </Grid>

      <Grid item xs={12} lg={6} className=' lg:block w-full relative'>
        <p className='text-center'>Middle</p>
      </Grid>

      <Grid item xs={0} lg={3} className=' lg:block w-full relative'>
        <p className='text-center'>Right</p>
      </Grid>
    
    </Grid>
    
  )
}

export default HomePage