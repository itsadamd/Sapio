import React, { useState } from 'react';

import DateInput from './DateInput';
import TickerInput from './TickerInput';
import OutputTypeInput from './OutputTypeInput';

/**
 * Input - A top-level form component that manages and collects
 * user input for date range selection, ticker selection, and output file configuration.
 *
 * It composes three subcomponents:
 * - `DateInput`: For selecting a date range or fiscal quarter/year range
 * - `TickerInput`: For entering or uploading tickers
 * - `OutputTypeInput`: For specifying output format, compression, and date format
 *
 * When the user submits the form, the complete `formData` is passed
 * to the parent via the `onSubmit` callback.
 *
 * @component
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Function called with the full form data object on form submission
 *
 * @returns {JSX.Element} A composite form containing date, ticker, and output format inputs
 */
function Input({ onSubmit }) {

    /**
     * Local state to track the full form data across all input sections.
     * Each subfield corresponds to a separate input component.
     */
    const [formData, setFormData] = useState({
        dateInput: {
            selectionMode: "Fiscal", // Can be "Date" or "Fiscal"
            endDate: new Date(),
            startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            startFiscalQuarter: "Q1",
            startFiscalYear: "2020",
            endFiscalQuarter: "Q1",
            endFiscalYear: "2025",
        },
        tickerInput: {
            selectionMode: "Manual", // Can be "Manual", "File", or "All"
            tickers: [] // List of selected tickers
        },
        outputTypeInput: {
            outputFormat: "CSV", // "CSV" or "XLSX"
            compressionType: "Uncompressed", // "Uncompressed" or "ZIP"
            dateFormat: "YYYY-MM-DD" // One of "YYYY-MM-DD", "DD/MM/YYYY", "YYYYMMDD"
        }
    });

    function isInputValid() {
        if (formData.tickers == []) {
            if (formData.endDate >= formData.startDate || formData.endFiscalYear > formData.startFiscalYear) {

                return false;

            }
        }

        return true;

    }

    /**
     * Handles form submission by preventing default behavior
     * and passing the current form data up to the parent component.
     *
     * @param {React.FormEvent} e - The form submit event
     */
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    /**
     * Updates a specific section of the form data (e.g., `dateInput`, `tickerInput`, etc.)
     *
     * @param {string} input - Key of the section to update (e.g., "dateInput")
     * @param {Object} data - New data to set for that section
     */
    function handleChange(input, data) {
        setFormData(prev => ({ ...prev, [input]: data }));
    }

    return (
        <>
        <h2 className="text-gray-700 font-medium text-left py-6">Step 1: Enter Date Range</h2>
            <DateInput 
                formData={formData.dateInput}
                onChange={(data) => handleChange("dateInput", data)}
            />

        <h2 className="text-gray-700 font-medium text-left py-6">Step 2: Enter Tickers to Search</h2>
            <TickerInput 
                formData={formData.tickerInput}
                onChange={(data) => handleChange("tickerInput", data)}
            />

        <h2 className="text-gray-700 font-medium text-left py-6">Step 3: Choose Output Type</h2>
            <OutputTypeInput 
                formData={formData.outputTypeInput}
                onChange={(data) => handleChange("outputTypeInput", data)}
            />

        <div className="flex justify-center mt-6">
        <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Request Data
        </button>
        </div>
        </>
    );
}

export default Input;
