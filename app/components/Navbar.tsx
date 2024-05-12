import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-8 w-full ">
      <Link
        href="/"
        className=" flex items-center font-bold gap-2 title text-2xl cursor-pointer list-none border-4 border-black p-2 rounded-2xl"
      >
        <FaHome />
        Home
      </Link>
      <ul>
        <li>
          <Link
            href="/newTask"
            className="bg-white py-2 px-4 text-black  text-2xl font-bold rounded-2xl p-2 border-4 border-black"
          >
            Create
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
