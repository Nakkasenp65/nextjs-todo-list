"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [task, setTask] = useState({
    taskName: "",
    taskDesc: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (task.taskName === "") {
      alert("name required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("form submit error");
      }
      router.refresh();
      router.push("/");
      return response.json();
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   console.log(task);
  // }, [task]);

  return (
    <div className="absolute w-full flex justify-center items-center mx-auto gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-black border-4 p-16 gap-8 rounded-lg "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="taskName">Name: </label>
          <input
            type="text"
            name="taskName"
            className="px-4 py-2 rounded-lg text-black border-zinc-500 border-2"
            value={task.taskName}
            onChange={handleChange}
            placeholder="name"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="taskName">Description: </label>

          <textarea
            name="taskDesc"
            className=" px-4 w-96 h-48 text-black border-zinc-500 border-2 rounded-2xl p-2"
            value={task.taskDesc}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mx-auto py-2 px-4 border-2 border-zinc-500 w-max rounded-lg "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
