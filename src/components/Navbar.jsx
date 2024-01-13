import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-screen bg-[#f2f4ff]">
      {/* <nav className="flex justify-between items-center w-[92%] mx-auto p-5">
        <div>
          <img
            className="w-16 cursor-pointer"
            src="./src/assets/img/logo.png"
            alt="..."
          />
        </div>
        <div
          className={`nav-links duration-500 md:static absolute  md:min-h-fit min-h-[60vh] left-0 top-${
            menuOpen ? '0%' : '[-100%]'
          } md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link className="hover:text-gray-500" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/sign-in">
                SignIn
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/sign-out">
                SignOut
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <button className="bg-[#0e1e3d] text-white px-5 py-3 rounded-md hover:bg-[#87acec]">
            Sign Up
          </button>
          <ion-icon
            onClick={onToggleMenu}
            name={menuOpen ? 'close' : 'menu'}
            className="text-3xl cursor-pointer md:hidden"
          ></ion-icon>
        </div>

        <div className="flex items-center gap-6">
          <input type='text' className='bg-gray-400 border-none outline-none p-3' placeholder='search here' />
          
          <ion-icon
            onClick={onToggleMenu}
            name={menuOpen ? 'close' : 'menu'}
            className="text-3xl cursor-pointer md:hidden"
          ></ion-icon>
        </div>

      </nav> */}
      <header>
        <div className="flex justify-between items-center py-4">
          <h1 className="font-bold text-lg mx-auto sm:text-2xl">
          <Link to="/">
            <span className="text-slate-500">Mehdi</span>
            <span className="text-slate-700">Estate</span>
          </Link>
          </h1>
          <form className="flex items-center bg-slate-300 rounded-sm px-2 sm:px-5 py-1 mx-auto w-fit">
            <input type="text" placeholder="Search" className="w-[120px] bg-transparent text-white focus:outline-none px-2 py-1 sm:w-[300px]"/>
            <FaSearch className="text-white"></FaSearch>
          </form>
          <ul className="flex gap-4 mx-auto sm:gap-6">
            <li className="hover:underline hidden sm:block">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline ">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:underline ">
              <Link to="/signin">Signin</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
