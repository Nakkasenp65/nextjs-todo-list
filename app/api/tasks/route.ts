import { NextResponse } from "next/server";
import { pool } from "../../utils/db";

export async function GET(res: Response) {
  const promisePool = pool.promise();

  const [rows] = await promisePool.query("SELECT * FROM task WHERE 1;");
  if (!res) {
    return NextResponse.json({
      message: "Error no response (RES)",
      status: 500,
    });
  }

  if (!rows) {
    return NextResponse.json({ message: "Error no response", status: 500 });
  }
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  try {
    const promisePool = pool.promise();
    const { taskName, taskDesc } = await request.json();
    if (taskName === "") {
      throw new Error("name required.");
    }
    const response = promisePool.query(
      "INSERT INTO task (taskName, taskDesc) VALUES (?,?)",
      [taskName, taskDesc]
    );
    if (!response) {
      throw new Error("Failed to insert task");
    }
    return NextResponse.json({ message: "Query successfully", status: 201 });
  } catch (error) {
    console.log("POST ERROR:", error);
    return NextResponse.json({ message: `${error}`, status: 500 });
  }
}
