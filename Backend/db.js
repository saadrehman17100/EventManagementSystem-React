import mysql from "mysql2";

export const db = mysql.createPool({
  connectionLimit: 1000,
  host: "localhost",
  user: "root",
  password: "Saadrehman123@@!",
  database: "event",
});
