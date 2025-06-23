
async function handleDataRequest(req, res) {

  tickerCIKDict = getCIKByTicker(['NVDA','AAPL']); // takes in unfiltered data, and outputs CIK lists

  data = {}

  for (const ticker in tickerCIKDict) {

    data[ticker] = await getCompanyData(tickerCIKDict[ticker]); // get data 

  }
  console.log(data);
  res.json({ 'data': data});

}

async function getCompanyData(tickerCIK) {

  const response = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${tickerCIK}.json`, {
      method: 'GET',
      headers: {
        'User-Agent': 'adouangprachanh.hba2026@ivey.ca',
        'Accept': 'text/html'
      },
  });

  return await response.json();

}

/*
// get companyOptions for multi-select on front end
app.get('/api/company-options', async (req, res) => {
  const fetchCompanyOptions = async () => { // function to grab the data
    const response = await fetch('https://www.sec.gov/files/company_tickers.json', {
      headers: {
        'User-Agent': 'adouangprachanh.hba2026@ivey.ca'
      }
    });
    return await response.json(); // return data
  }; 
  // try to grab data
  try {
    // turn data into options list
    const companyOptions = await fetchCompanyOptions().then(data => 
      Object.values(data).map(({ticker, title}) => ({
        value: ticker,
        label: title
      }))
    );
    // send data back
    res.json({ options: companyOptions});

  } catch (error) {// catching errors
    res.status(500).json({ error: 'Failed to fetch SEC data' });

  }
});
*/

module.exports = { handleDataRequest };