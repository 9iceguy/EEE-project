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
        className="m-2 flex flex-col gap-3 rounded-2xl px-3 py-3 text-black backdrop-blur-sm sm:m-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <Link to="/">
          <div className="logo flex items-center gap-3">
            <img
              src="/src/assets/logo1.jpg"
              alt="Logo"
              width="80"
              height="80"
              className="logo size-12 shrink-0 rounded-full sm:size-16"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-serif sm:text-2xl lg:text-3xl">EEE OAU</h1>
              <h2 className="text-xs font-medium sm:text-sm lg:text-base">
                Bedrock of modern technology...
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
