const axios = require('axios')

const SUPABASE_URL = 'https://iebcjbvhfzizesjmrwrz.supabase.co/rest/v1/'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllYmNqYnZoZnppemVzam1yd3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNTAxMDAsImV4cCI6MjA2NjgyNjEwMH0.brqbZ01ssOwzPcD7T-9pToO0dRe0VerB00_c_nyrwAQ'


function buildQueryParams(req) {

    console.log(req)

    params = {};

    let tickers = '';
    for (let i = 0; i < req.tickerInput.tickers.length; i++) {
        tickers += req.tickerInput.tickers[i];
        if (i < req.tickerInput.tickers.length - 1) {
            tickers += ',';
        }
    }

    params.ticker = `in.(${tickers})`;

    if (req.dateInput.selectionMode === 'Fiscal') {
        const startFiscal = `${req.dateInput.startFiscalYear}${req.dateInput.startFiscalQuarter}`;
        const endFiscal = `${req.dateInput.endFiscalYear}${req.dateInput.endFiscalQuarter}`;

        params.fiscal= `in.(${generateFiscalPeriods(startFiscal, endFiscal)})`;
    
    } else if (req.dateInput.selectionMode === 'Date') {

        params.and = `(date.gte.${req.dateInput.startDate}, date.lte.${req.dateInput.endDate})`

    }

    return params

}


function generateFiscalPeriods(startFiscal, endFiscal) {
  const periods = [];
  
  let year = parseInt(startFiscal.substring(0, 4));
  let quarter = startFiscal.substring(4) === 'FY' ? 4 : parseInt(startFiscal.substring(5));
  
  const endYear = parseInt(endFiscal.substring(0, 4));
  const endQuarter = endFiscal.substring(4) === 'FY' ? 4 : parseInt(endFiscal.substring(5));
  
  while (year < endYear || (year === endYear && quarter <= endQuarter)) {
    periods.push(quarter === 4 ? `${year}FY` : `${year}Q${quarter}`);
    
    quarter++;
    if (quarter > 4) {
      quarter = 1;
      year++;
    }
  }
  
  return periods.join(',');
}

async function getCompanyData(params) {

  try {
    const response = await axios.get(`${SUPABASE_URL}/CompanyData`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: 'application/json',
      },
      params: params
    })

    return response.data;

  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message)
  }

}

module.exports =  { buildQueryParams, getCompanyData };