import HomePage from "./Components/HomePage/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "./Storage/Auth/Action";

import AuthPage from "./Authentication/AuthPage";
import LandingPage from "./Authentication/LandingPage";
import Help from "./Components/Help/Help";

function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      console.log("jwt= ", jwt);
      dispatch(getUserProfile(jwt));
      navigate("/");
    }
  }, [jwt]);

  console.log("auth ", auth);

  return (
    <div className="">
      <Routes>
        {/* <Route path="/*" element={auth.user ? <HomePage /> : <HomePage />}></Route> */}
        <Route path="/*" element={auth.user ? <HomePage /> : <LandingPage />}></Route>
        <Route path="/Authentication/*" element={<AuthPage />}></Route>
        <Route path="/welcome/help" element={<Help />}></Route>
      </Routes>
    </div>
  );
}

export default App;
