// react component imports
import React, { useState } from 'react';
import Input from './Input';

// search component, contains input and results button
function Search() {

    const [isDownloading, setIsDownloading] = useState(false);

    async function handleQuery(data) {
        
        try {
            setIsDownloading(true);
            
            const response = await fetch('/api/get-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get the blob from response (don't try to parse as JSON!)
            const blob = await response.blob();
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'company_data.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            console.log('File downloaded successfully!');

        } catch (error) {
            console.error('Error fetching data from server:', error);
            alert('Error downloading file. Please try again.');
        } finally {
            setIsDownloading(false);
        }

    }

    function handleSubmit(e) {
        handleQuery(e);
    }

    return (
    <div className="bg-white w-1/2 mx-auto px-[30px] py-[30px] min-h-screen">
        <h1 className="text-black-500 font-medium text-4xl">Sapio</h1>
        <p className="text-gray-600 font-normal text-base mt-2 mb-[-10px]">
        An online tool to search, access, and download financial filings and ownership data from the SEC's EDGAR database.
        </p>
        <Input onSubmit={handleSubmit} />
        {isDownloading && (
            <div className="mt-4 text-blue-600">
                Downloading file...
            </div>
        )}
    </div>
    );

}

export default Search;