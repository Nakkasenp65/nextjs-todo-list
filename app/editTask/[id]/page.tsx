"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPage = ({ params }) => {
  const fetchTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${params.id}`
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data[0]);
      setTask(data[0]);
      console.log(task);
      console.log("Fetch succesfully");
    } catch (error) {
      console.log("Fetch task error:", error);
    }
  };

  const [task, setTask] = useState({
    taskId: "",
    taskName: "",
    taskDesc: "",
    taskCreated: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (task.taskName === "") {
      alert("name required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      if (response.ok) {
        alert("success");
        router.refresh();
        router.push("/");
      } else {
        throw new Error("FAIL");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchTask();
    console.log(task);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center px-16 gap-4">
      <div className="info text-zinc-500 border-2 border-zinc-500 p-3 rounded-full">
        ID: {task.taskId} / {task.taskCreated.split("T")[0]}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-16 rounded-lg  "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="taskName" className="ml-4 text-zinc-500">
            Name:{" "}
          </label>
          <input
            type="text"
            name="taskName"
            className="p-4 rounded-lg text-black border-zinc-500 border"
            value={task.taskName}
            onChange={handleChange}
            placeholder="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="taskName" className="ml-4 text-zinc-500">
            Description:{" "}
          </label>

          <textarea
            name="taskDesc"
            className=" p-4 rounded-lg h-48 text-black border-zinc-500 border"
            value={task.taskDesc}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mx-auto p-4 border-zinc-500 border-2 w-max rounded-lg "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPage;
