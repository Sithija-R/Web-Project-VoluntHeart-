import React, { useEffect, useRef } from 'react'
import './AuthPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import loginSVG from '../Resources/assets/safe.svg'
import SignUp from '../Resources/assets/SignUpLock.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignForm from './SignForm'

const AuthPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const loginPageRef = useRef(null);

  useEffect(() => {
    const loginpage = loginPageRef.current;

    if (loginpage) {
      if (location.pathname.includes('/authentication/signup')) {
        loginpage.classList.add("sign-up-mode");
      } else if (location.pathname.includes('/authentication/login')) {
        loginpage.classList.remove("sign-up-mode");
      }
    }
  }, [location.pathname]);


  return (
  
    
    
    <div className="loginpage " ref={loginPageRef}>
      <div className='text-gray-900 font-semibold  text-xl fixed top-5 left-5 z-50 flex justify-between items-center space-x-1 cursor-pointer' onClick={()=>navigate("/Welcome")}>
      <ArrowBackIcon/>
      <p>Back</p>
      </div>
     
      <div className="formsContainer">
        <div className="signin-signup">

        
            <section className="sign-in-form">

             <LoginForm/>
            </section>

      
           
         <section className="sign-up-form">
           
          <SignForm/>

         </section>
         
            
        </div>
      </div>

      <div className="panelsContainer">
        <div className="panel left-panel">
          <div className="content">
            <h3>New to voluntHeart?</h3>
            <p>Join Voluntheart, empower communities, make a difference. Sign up now.</p>
            <button className="btnTransparent" id="sign-up-btn" onClick={()=>navigate('/authentication/signup')}>Sign up</button>
          </div>
          <img src={loginSVG} alt="" className='image' />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Back to voluntHeart?</h3>
            <p>Welcome to Voluntheart. Spread kindness, make a difference. Sign in now</p>
            <button className="btnTransparent" id="sign-in-btn" onClick={()=>navigate('/authentication/login')}>Sign in</button>
          </div>
          <img src={SignUp} alt="" className='image' />
        </div>
      </div>
    </div>
   
  )
}

export default AuthPage;
