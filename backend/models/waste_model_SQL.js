//import connection
import MYSQL_pool from "../config/MYSQL_DB.js";


//Get photo id (fk in waste table)
export async function getPlasticWeekly(){
  const plastic = await MYSQL_pool.query("SELECT SUM(type_waste.weight*waste.amount) AS plastic, WEEK(w_time) as week, MONTH(w_time) as month, YEAR(w_time) as year FROM waste INNER JOIN type_waste ON waste.id_type=type_waste.id_type WHERE (type_waste.id_type IN (3,4)) GROUP BY WEEK(w_time), MONTH(w_time), YEAR(w_time)")
  return plastic[0];
}

export async function getMetalWeekly(){
  const metal = await MYSQL_pool.query("SELECT SUM(type_waste.weight*waste.amount) AS metal, WEEK(w_time) as week, MONTH(w_time) as month, YEAR(w_time) as year FROM waste INNER JOIN type_waste ON waste.id_type=type_waste.id_type WHERE (type_waste.id_type IN (1,2,5)) GROUP BY WEEK(w_time), MONTH(w_time), YEAR(w_time)")
  return metal[0];
}

