const axios = require('axios')

const SUPABASE_URL = 'https://iebcjbvhfzizesjmrwrz.supabase.co/rest/v1/'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllYmNqYnZoZnppemVzam1yd3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNTAxMDAsImV4cCI6MjA2NjgyNjEwMH0.brqbZ01ssOwzPcD7T-9pToO0dRe0VerB00_c_nyrwAQ'

const { buildQueryParams, getCompanyData } = require('../services/companyDataService');
const { generateFile } = require('../services/fileExportService');

async function handleQueryRequest(req, res) {

  const params = buildQueryParams(req.body);

  const data = await getCompanyData(params);

  const [file, header, extension] = await generateFile(data, req.body.outputTypeInput.outputFormat);

  console.log(extension)

  res.attachment(`company_data${extension}`)

  /*res.setHeader('Content-Type', header);
  res.setHeader('Content-Disposition', `attachment; filename="company_data${extension}"`);*/
  res.send(file);

}

module.exports = { handleQueryRequest };