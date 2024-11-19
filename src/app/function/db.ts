import mysql2 from "mysql2";
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

async function createConnection() {
  const pool = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: port,
  });
  return pool.promise();
}
export default createConnection;
