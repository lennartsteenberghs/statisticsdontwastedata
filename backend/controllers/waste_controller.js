//import functions from waste model
import {
  getMetalWeekly,
  getPlasticWeekly,
} from "../models/waste_model_SQL.js";

import excel from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//show CO2 safed
export async function getWasteExcel(req, res) {
  await getMetalWeekly();
  await getPlasticWeekly();
};

//redirect to generated link
export async function getMPExcel(req, res) {
  const MWeekly = await getMetalWeekly();
  const PWeekly = await getPlasticWeekly();

  /**
    [ { id: 1, address: 'Jack Smith', age: 23, name: 'Massachusetts' },
    { id: 2, address: 'Adam Johnson', age: 27, name: 'New York' },
    { id: 3, address: 'Katherin Carter', age: 26, name: 'Washington DC' },
    { id: 4, address: 'Jack London', age: 33, name: 'Nevada' },
    { id: 5, address: 'Jason Bourne', age: 36, name: 'California' } ]
  */
  
  let workbook = new excel.Workbook(); //creating workbook
  let Pworksheet = workbook.addWorksheet('Plastic'); //creating worksheet Plastic data
  let Mworksheet = workbook.addWorksheet('Metal'); //creating worksheet Plastic data
 
  //  WorkSheet Plastic
  Pworksheet.columns = [
    { header: 'Amount (g)', key: 'plastic', width: 10 },
    { header: 'Week', key: 'week', width: 30 },
    { header: 'Month', key: 'month', width: 30},
    { header: 'Year', key: 'year', width: 10, outlineLevel: 1}
  ];

  //  WorkSheet Metal
  Mworksheet.columns = [
    { header: 'Amount (g)', key: 'metal', width: 10 },
    { header: 'Week', key: 'week', width: 30 },
    { header: 'Month', key: 'month', width: 30},
    { header: 'Year', key: 'year', width: 10, outlineLevel: 1}
  ];

  // Add Array Rows
  Pworksheet.addRows(PWeekly);
  Mworksheet.addRows(MWeekly);
 
  // Write to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'MetalPlastics.xlsx');

  console.log("juwwwww")

  res.send(buffer);
};