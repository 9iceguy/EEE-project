// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admindashboard from "./Pages/Admindashboard";
import Landing from "./pages/Landing";
import Login from "./Pages/Login";
import AppLayout from "./Applayout";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/admin" element={<Admindashboard />} />
            <Route path="" element={<Landing />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
