// services/fileExportService.js
const createCsvString = require('csv-writer').createObjectCsvStringifier;
const ExcelJS = require('exceljs');

async function generateFile(data, file_type) {

    if (file_type === 'CSV') {

        return [await generateCSV(data), 'text/csv', '.csv'];

    } else if (file_type === 'XLSX'){
        
        return [await generateExcel(data), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.xlsx'];

    }


}

async function generateCSV(data) {
  const csvStringifier = createCsvString({
    header: [
      { id: 'CIK', title: 'CIK' },
      { id: 'ticker', title: 'Ticker' },
      { id: 'entity_name', title: 'Entity Name' },
      { id: 'fiscal', title: 'Fiscal Period' },
      { id: 'date', title: 'Date' },
      { id: 'label', title: 'Label' },
      { id: 'value', title: 'Value' }
    ]
  });
  
  return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
}

async function generateExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Company Data');
  
  // Define columns
  worksheet.columns = [
    { header: 'CIK', key: 'CIK' },
    { header: 'Ticker', key: 'ticker' },
    { header: 'Entity Name', key: 'entity_name' },
    { header: 'Fiscal Period', key: 'fiscal' },
    { header: 'Date', key: 'date' },
    { header: 'Label', key: 'label' },
    { header: 'Value', key: 'value' }
  ];
  
  // Add data rows
  worksheet.addRows(data);
  
  return await workbook.xlsx.writeBuffer();
}

module.exports = { generateFile };