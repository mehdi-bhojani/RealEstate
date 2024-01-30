// import  { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  // const [menuOpen, setMenuOpen] = useState(false);

  // const onToggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  return (
    <div className="w-screen bg-[#f2f4ff]">
      <header>
        <div className="flex justify-between items-center py-4">
          <h1 className="font-bold text-lg mx-auto sm:text-2xl">
            <Link to="/">
              <span className="text-slate-500">Mehdi</span>
              <span className="text-slate-700">Estate</span>
            </Link>
          </h1>
          <form className="flex items-center bg-slate-300 rounded-sm px-2 sm:px-5 py-1 mx-auto w-fit">
            <input
              type="text"
              placeholder="Search"
              className="w-[120px] bg-transparent text-white focus:outline-none px-2 py-1 sm:w-[300px]"
            />
            <FaSearch className="text-white"></FaSearch>
          </form>
          <ul className="flex gap-4 mx-auto sm:gap-6 align-middle">
            <li className="hover:underline hidden sm:block">
              <Link className="h-auto" to="/">
                Home
              </Link>
            </li>
            <li className="hover:underline">
              <Link className="" to="/about">
                About
              </Link>
            </li>
            <li className="max-w-10">
              {currentUser ? (
                <Link to="/profile">
                  <img
                    className="rounded-full object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />{" "}
                </Link>
              ) : (
                <Link to="/sign-in">Signin</Link>
              )}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
