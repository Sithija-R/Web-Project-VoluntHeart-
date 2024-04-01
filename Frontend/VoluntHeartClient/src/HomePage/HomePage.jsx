import React from 'react'
import {Grid} from "@mui/material"
import Navigation from '../Navigation/Navigation'

const HomePage = () => {
  return (
    <>
    
    <header className='bg-blue-100 h-16 py-1 px-3'>
    <div className="py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width='50'>
                    <title>React Logo</title>
                    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                    <g stroke="#61dafb" stroke-width="1" fill="none">
                        <ellipse rx="11" ry="4.2"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                    </svg>
                </div>
    </header>
    <Grid container xs={12} className='px-5 lg-10 justify-between bg-slate-200'>

      <Grid item xs={0} lg={2} className=' lg:block max-w-10 relative bg-lime-100 '>
        <Navigation/>
      </Grid>

      <Grid item xs={12} lg={6} className=' lg:block w-full relative bg-amber-100 '>
        <p className='text-center'>Middle</p>
      </Grid>

      <Grid item xs={0} lg={3} className=' lg:block w-full relative bg-red-100'>
        <p className='text-center'>Right</p>
      </Grid>
    
    </Grid>
    
    </>
  )
}

export default HomePage