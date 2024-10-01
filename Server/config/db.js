import mysql from 'mysql2';
import { configDotenv } from 'dotenv';
configDotenv();
const HOST=process.env.DB_USER;
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const DATABASE=process.env.DB_DATABASE;

 const db=mysql.createPool({
    host:HOST,
    user:USERNAME,
    password:PASSWORD,
    database:DATABASE,
    waitForConnections:true,
    connectionLimit:5,
    queueLimit:0
});

export default db;