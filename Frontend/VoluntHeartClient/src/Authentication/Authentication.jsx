import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignForm from "./SignForm";

const Authentication = () => {
  return (
    <div className=" bg-slate-100 w-full h-screen p-7  flex items-center justify-center">
      <div className=" w-11/12 bg-white h-[85vh] m-auto  rounded-[30px] shadow-2xl flex items-center justify-between">
        <div className=" w-7/12 h-[75vh] bg-slate-500"></div>

        <div className="bg-green-100 h-[75vh] w-5/12">
          <Routes>
            <Route path="/" element={ <LoginForm/>}></Route>
            <Route path="/authentication/login" element={<LoginForm />} />
            <Route path="/authentication/signin/" element={<SignForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
