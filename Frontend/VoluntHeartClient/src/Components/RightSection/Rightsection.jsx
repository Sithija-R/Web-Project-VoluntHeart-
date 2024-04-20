import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SuggestionCard from './SuggestionCard';

const Rightsection = () => {
  return (
   

    <div className='py-5 px-2 sticky top-0 '>
      <div className=" flex justify-around items-center px-3">
        <input type="text" placeholder='Search' className='py-3 rounded-full text-gray-600 w-9/12 px-3 text-md' />
        <SearchIcon fontSize='large' sx={{color:"#2b2b2b"}}/>
      </div>

    <section className='mt-8'>
      <h2 className='px-2 text-gray-600 mb-3 font-bold'>Suggestions</h2>
      <div className="hideScrollBar overflow-y-scroll px-3 space-y-2 " style={{height:'75vh'}}>
        {[1,2,3,4,5,6,7].map((item)=> <SuggestionCard/>)}
      </div>
    </section>
      


    </div>




  )
}

export default Rightsection