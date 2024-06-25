import React, { useState } from 'react'

import logo3 from '../../Resources/assets/logo3.png'
import { Link } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNavicon, faX } from '@fortawesome/free-solid-svg-icons'

const LandingNavbar = () => {
  const navigate= useNavigate();
  const [menuPosition,setmenuPosition]=useState(-250);
  const handleLoginClick = () => {
    navigate('/login');
  };
  const showMenu=()=>{
    setmenuPosition(0);
  }
  const hideMenu=()=>{
    setmenuPosition(-250);
  }
  return (
    
    
   <nav className='px-5 py-1' >
            <img src={logo3}  className='logo' alt="" />

           <div>
           <ul id="navLinks" style={{left:menuPosition + 'px'}}>
             <li ><FontAwesomeIcon icon={faX} className='cut' id=" cut"onClick={hideMenu} /></li>

                <li><Link to='heroId' smooth={true} offset={0} duration={500} className='scrollLiink' > Home </Link></li>
                <li><Link to='aboutId' smooth={true} offset={-100} duration={500} className='scrollLiink'>About Us </Link></li>
                <li><Link to='testimonialsId' smooth={true} offset={-100} duration={500} className='scrollLiink'>Testimonials </Link></li>
                <li><Link to='contactId' smooth={true} offset={-100} duration={500} className='scrollLiink'>Contact Us </Link></li>
                <li> 
                  <button className='btn' onClick={handleLoginClick} >  Logout</button> 
                  
                </li>

            </ul>
           </div>
           <FontAwesomeIcon icon={faNavicon} className='menu' onClick={showMenu} />

    </nav>
  )
}

export default LandingNavbar
