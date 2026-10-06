// import React from 'react'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
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
