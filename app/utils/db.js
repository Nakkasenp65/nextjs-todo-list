const mysql = require("mysql2");
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test",
});
