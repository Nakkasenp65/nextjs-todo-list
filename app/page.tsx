"use client";

import { useEffect, useState } from "react";
import Task from "./components/Task";

interface Task {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskCreated: string;
}

export default function Home() {
  const [task, setTask] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const task = await response.json();
      setTask(task);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  console.log(task);

  return (
    <div className="w-full flex">
      <div className="flex flex-wrap justify-center gap-4 m-8">
        {task.map((t) => (
          <Task dat={t} />
        ))}
      </div>
    </div>
  );
}
