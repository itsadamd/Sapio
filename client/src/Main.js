// react component imports
import React, { useState } from 'react';
import Input from './Input';
import Results from './Results';

// search component, contains input and results button
function Search() {

    const [query, setQuery] = useState();

    async function handleQuery(data) {
        
        try {
            const response = await fetch('/api/get-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resp = await response.json();
            console.log(resp);

        } catch (error) {
            console.error('Error fetching data from server:', error);
        }

    }

    function handleSubmit(e) {
        setQuery(e);
        console.log(e);
    }

    return (
    <>
        <Input onSubmit={handleSubmit} />
        <h2>Results:</h2>
        <Results />
    </>
    );

}

export default Search;