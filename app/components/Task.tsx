import { FiDelete, FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import React from "react";

function Task({ dat }) {
  const deleteTask = async (e: any) => {
    e.preventDefault();
    const response = fetch(`http://localhost:3000/api/tasks/${dat.taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <ul
      key={dat.taskId}
      className="flex flex-col justify-between w-96 border-zinc-500 border-4 rounded-lg p-2 gap-4"
    >
      <div className="title flex justify-between items-center gap-8 ">
        <li className="text-xl">{dat.taskName}</li>{" "}
        <Link href={`/editTask/${dat.taskId}`}>
          {" "}
          <div className="item-container flex items-center gap-2">
            <FiEdit className="ease-in-out duration-300 hover:text-2xl text-xl cursor-pointer" />
          </div>
        </Link>
      </div>
      <li className=" p-2 rounded-2xl min-h-36 my-4">{dat.taskDesc}</li>
      <li className=" flex justify-between font-extralight">
        Created: {dat.taskCreated.split("T")[0]}
        <FaRegTrashAlt className="ease-in-out duration-300 hover:text-2xl text-xl cursor-pointer" />
      </li>
    </ul>
  );
}

export default Task;
