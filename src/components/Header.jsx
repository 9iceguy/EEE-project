// import React from 'react'
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  if (pathname === "/register") {
    return (
      <header className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4 text-slate-950 sm:px-7">
        <Link to="/register" className="flex items-center gap-2 text-sm font-semibold">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700"
          >
            E
          </span>
          Sign Up
        </Link>
        <Link
          to="/login"
          className="text-xs font-medium text-slate-700 transition hover:text-blue-700"
        >
          Sign in
        </Link>
      </header>
    );
  }

  return (
    <div>
      <header
        className=" text-black
         m-4 flex justify-between rounded-2xl  py-3 px-6   backdrop-blur-sm"
      >
        <Link to="/">
          <div className="flex align-middle logo gap-3">
            <img
              src="/src/assets/logo1.jpg"
              alt="Logo"
              width="100"
              height="100"
              className="inline-block rounded-full  logo mr-2 "
            />
            <div className="flex-col mt-4">
              <h1 className="text-3xl font-serif">EEE OAU</h1>
              <h2 className="text-xl font-medium">
                Bedrock of modern technology...{" "}
              </h2>
            </div>
          </div>
        </Link>
        <Navbar />
      </header>
    </div>
  );
};

export default Header;
