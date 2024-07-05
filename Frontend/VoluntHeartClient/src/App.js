
import './App.css';

import HomePage from './Components/HomePage/HomePage';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getUserProfile } from './Storage/Auth/Action';

import AuthPage from './Authentication/AuthPage';
import LandingPage from './Authentication/LandingPage';



function App() {

const jwt= localStorage.getItem("jwt");
const {auth} = useSelector(store=>store)
const { post } = useSelector((Storage) => Storage);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=>{
  if(jwt){
    dispatch(getUserProfile(jwt))
    navigate("/")
  }
},[auth.jwt])



  return (
    <div className="">
      
    <Routes>
      <Route path="/*" element={auth.user?<HomePage/>:<LandingPage/>}>
       

      </Route>
      <Route path='/Authentication/*' element={<AuthPage/>}>

      </Route>
    </Routes>


    </div>
  );
}

export default App;
