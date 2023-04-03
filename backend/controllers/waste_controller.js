//import functions from waste model
import {
  getMetalWeekly,
  getPlasticWeekly,
  getWastedata,
} from "../models/waste_model_SQL.js";

import excel from 'exceljs'


//generate excel with waste data and photo link
export async function getWasteExcel(req, res) {
  const Waste = await getWastedata();
  
  let workbook = new excel.Workbook(); //creating workbook
  let worksheet = workbook.addWorksheet('Waste'); //creating worksheet Waste data
 
  //  WorkSheet 
  worksheet.columns = [
    { header: 'Time', key: 'time', width: 30, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
    { header: 'Type', key: 'type', width: 30 },
    { header: 'Amount', key: 'amount', width: 10 },
    { header: 'Bin number', key: 'binnr', width: 10},
    { header: 'Photo link', key: 'photo_link', width: 60}
  ];

  // Add Array Rows
  worksheet.addRows(Waste);
 
  // Write to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'WasteData.xlsx');

  res.send(buffer);
};

//generate excel with metal and plastic consumption for each week
export async function getMPExcel(req, res) {
  const MWeekly = await getMetalWeekly();
  const PWeekly = await getPlasticWeekly();
  
  let workbook = new excel.Workbook(); //creating workbook
  let Pworksheet = workbook.addWorksheet('Plastic'); //creating worksheet Plastic data
  let Mworksheet = workbook.addWorksheet('Metal'); //creating worksheet Plastic data
 
  //  WorkSheet Plastic
  Pworksheet.columns = [
    { header: 'Amount (g)', key: 'plastic', width: 10 },
    { header: 'Week', key: 'week', width: 10 },
    { header: 'Month', key: 'month', width: 10},
    { header: 'Year', key: 'year', width: 10}
  ];

  //  WorkSheet Metal
  Mworksheet.columns = [
    { header: 'Amount (g)', key: 'plastic', width: 10 },
    { header: 'Week', key: 'week', width: 10 },
    { header: 'Month', key: 'month', width: 10},
    { header: 'Year', key: 'year', width: 10}
  ];

  // Add Array Rows
  Pworksheet.addRows(PWeekly);
  Mworksheet.addRows(MWeekly);
 
  // Write to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'MetalPlastics.xlsx');

  res.send(buffer);
};