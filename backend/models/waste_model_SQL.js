import mysql from "mysql2";
import dotenv from 'dotenv'
dotenv.config()

//create the connection pool to database
const MYSQL_pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

//Get photo id (fk in waste table)
export async function getPlasticWeekly(){
  const plastic = await MYSQL_pool.query("SELECT SUM(type_waste.weight*waste.amount) AS plastic, WEEK(w_time) as week, MONTH(w_time) as month, YEAR(w_time) as year FROM waste INNER JOIN type_waste ON waste.id_type=type_waste.id_type WHERE (type_waste.id_type IN (3,4)) GROUP BY WEEK(w_time), MONTH(w_time), YEAR(w_time)")
  return plastic[0];
}

export async function getMetalWeekly(){
  const metal = await MYSQL_pool.query("SELECT SUM(type_waste.weight*waste.amount) AS metal, WEEK(w_time) as week, MONTH(w_time) as month, YEAR(w_time) as year FROM waste INNER JOIN type_waste ON waste.id_type=type_waste.id_type WHERE (type_waste.id_type IN (1,2,5)) GROUP BY WEEK(w_time), MONTH(w_time), YEAR(w_time)")
  return metal[0];
}

export async function getWastedata(){
  const waste = await MYSQL_pool.query("SELECT w_time as time, type_waste.name as type, amount, id_bin as binnr, CONCAT('https://data-waste-collection-app-backend.onrender.com/getphoto/',id_photo) as photo_link FROM waste INNER JOIN type_waste ON waste.id_type=type_waste.id_type ORDER BY w_time")
  return waste[0];
}

