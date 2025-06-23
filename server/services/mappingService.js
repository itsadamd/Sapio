const fs = require('fs');

/**
 * Retrieves 10-digit padded CIK numbers for an array of stock tickers.
 *
 * This function reads from a local ticker-to-CIK mapping file, matches each input
 * ticker (case-insensitive), and returns a dictionary with the original ticker
 * as the key and its zero-padded 10-digit CIK string as the value.
 *
 * @param {string[]} tickers - An array of stock ticker symbols (e.g., ['AAPL', 'MSFT']).
 * @returns {Dict<string>} A dictionary mapping each input ticker to its CIK.
 */
function getCIKByTicker(tickers) {
    const CIKDictionary = readCIKMappingData('./data/ticker.txt');
    const tickerDictionary = {};

    for (const ticker of tickers) {
        CIK = CIKDictionary[ticker.toLowerCase()].toString().padStart(10, '0'); // add leading zeros
        tickerDictionary[ticker] = CIK 
    };

    return tickerDictionary;
}

/**
 * Reads a tab-delimited text file containing ticker-to-CIK mappings
 * and returns a dictionary with tickers as keys and CIK values as strings.
 * 
 * Each line in the file should have the format: TICKER<TAB>CIK
 * Blank lines are ignored.
 * 
 * @param {string} filePath - The path to the mapping file
 * @returns {dict<string>} A dictionary with tickers as keys and CIK values as strings.
 */
function readCIKMappingData(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split(/\r?\n/);
    const dict = {};

    // iterate through line
    for (const line of lines) {
        if (line.trim() === '') continue;  // skip empty lines
        // split line by tab
        const [ticker, value] = line.trim().split('\t');
        dict[ticker] = value
    }

    return dict;
}


module.exports = { getCIKByTicker, readCIKMappingData }