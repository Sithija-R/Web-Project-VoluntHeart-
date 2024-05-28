
import './App.css';
import Authentication from './Authentication/Authentication';
import HomePage from './Components/HomePage/HomePage';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getUserProfile } from './Storage/Auth/Action';



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
      <Route path="/*" element={auth.user?<HomePage/>:<Authentication/>}>

      </Route>
    </Routes>


    </div>
  );
}

export default App;
