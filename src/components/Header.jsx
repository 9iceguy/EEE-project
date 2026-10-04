// import React from 'react'

const Header = () => {
  return (
    <div>
      <header
        className="bg-gray-800 text-black
         m-4"
      >
        <div className="flex logo gap-3">
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            width="80"
            height="80"
            className="inline-block logo mr-2 "
          />
          <h1 className="text-2xl font-bold">My App</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
