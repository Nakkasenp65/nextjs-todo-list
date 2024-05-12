import { NextResponse } from "next/server";
import { pool } from "../../../utils/db";

export const GET = async (request: Request, response: Response) => {
  const id = request.url.split("tasks/")[1];
  try {
    const promisePool = pool.promise();
    const [rows] = await promisePool.query(
      `SELECT * FROM task WHERE taskId = ${id};`
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: `ERROR:${error}`, status: 500 });
  }
};

export const PATCH = async (request: Request, response: Response) => {
  // const id = request.url.split("tasks/")[1];
  const { taskId, taskName, taskDesc } = await request.json();
  try {
    const promisePool = pool.promise();
    const response = await promisePool.query(
      "UPDATE `task` SET `taskName` = ?, `taskDesc` = ? WHERE `task`.`taskId` = ?",
      [taskName, taskDesc, taskId]
    );
    if (!response) {
      throw new Error("Error no response");
    }
    return NextResponse.json({
      message: `Successfull update task: ${taskId}`,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: `ERROR:${error}`, status: 501 });
  }
};

export const DELETE = async (request: Request) => {
  const id = request.url.split("tasks/")[1];

  const { taskId } = await request.json();
  if (taskId === "") {
    return NextResponse.json({ message: "No id found" });
  }
  try {
    const promisePool = pool.promise();
    const response = await promisePool.query(
      `DELETE FROM task WHERE task.taskId = ${taskId}`
    );
    if (!response) {
      throw new Error("Error no response");
    }
    return NextResponse.json({
      message: `Delete task ID:${taskId} succesfully`,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: `ERROR:${error}`, status: 501 });
  }
};
