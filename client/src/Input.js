import React, { useState } from 'react';

function Input() {
    const [selectedMonth, setMonth] = useState('');

    function handleChange(e) {
    setMonth(e.target.value);
    }


    return (
        <div>
            <input 
                type="text" 
                value={selectedMonth} 
                onChange={handleChange}
            />
      <p>Selected Month: {selectedMonth}</p>
        </div>
    )
}

export default Input;