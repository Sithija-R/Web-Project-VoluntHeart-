
import './App.css';
import Authentication from './Authentication/Authentication';
import HomePage from './Components/HomePage/HomePage';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="">
      
    <Routes>
      <Route path="/*" element={true?<HomePage/>:<Authentication/>}>

      </Route>
    </Routes>


    </div>
  );
}

export default App;
