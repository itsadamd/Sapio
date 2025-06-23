import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

/**
 * TickerInput - A React component that allows users to input stock tickers manually,
 * upload via file, or select all tickers.
 * 
 * This component supports three selection modes controlled by radio buttons:
 * - "Manual": Allows manual entry of ticker symbols using a multi-select dropdown.
 * - "File": (Partially implemented) Displays a button for uploading a file (upload logic not shown).
 * - "All": Selects all companies without requiring user input.
 * 
 * The component uses local state to track the selected tickers and available options,
 * and it communicates changes to the parent component through the `onChange` callback.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.formData - The current state of the form from the parent component.
 *                                  Should include a `selectionMode` and optionally a `tickers` array.
 * @param {function} props.onChange - Callback to update the form data in the parent component.
 *                                    Called with the updated form object.
 *
 * @returns {JSX.Element} A ticker input UI consisting of radio buttons for mode selection,
 *                        a multi-select dropdown for manual entry, and a file upload button.
 */
function TickerInput({ formData, onChange }) {
    
    /**
     * State: List of available ticker options for the dropdown.
     * Can include both predefined and user-created tickers.
     */
    const [inputOptions, setInputOptions] = useState([]);

    /**
     * State: List of currently selected ticker options.
     * Each option is an object with `label` and `value` keys.
     */
    const [selected, setSelected] = useState([]);

    /**
     * Merges new values into the form data and notifies the parent component.
     *
     * @param {Object} newValues - Partial form data to merge (e.g., { tickers: ['AAPL', 'MSFT'] }).
     */
    function updateFormData(newValues) {
        onChange({ ...formData, ...newValues });
    }

    /**
     * Handles the creation of a new ticker symbol entered by the user.
     * Adds it to both the list of options and the current selection,
     * and updates the parent form state.
     *
     * @param {string} inputValue - The user-entered ticker symbol.
     */
    function handleCreate(inputValue) {
        const newOption = { value: inputValue, label: inputValue };
        const newSelected = [...selected, newOption];

        setInputOptions(prev => [...prev, newOption]);
        setSelected(newSelected);
        updateFormData({ tickers: newSelected.map(opt => opt.value) });
    }

    return (
        <>
            {/* Radio buttons for selecting the ticker input mode */}
            <div>
                <label>
                    <input
                        type="radio"
                        value="Manual"
                        checked={formData.selectionMode === "Manual"}
                        onChange={(e) => updateFormData({ selectionMode: e.target.value })}
                    />
                    By input
                </label>
                <label>
                    <input 
                        type="radio"
                        value="File"
                        checked={formData.selectionMode === "File"}
                        onChange={(e) => updateFormData({ selectionMode: e.target.value })}
                    />
                    By file
                </label>
                <label>
                    <input 
                        type="radio"
                        value="All"
                        checked={formData.selectionMode === "All"}
                        onChange={(e) => updateFormData({ selectionMode: e.target.value })}
                    />
                    Grab data for all companies
                </label>
            </div>

            {/* Multi-select dropdown for entering tickers manually */}
            <CreatableSelect
                isMulti
                options={inputOptions}
                value={selected}
                onChange={(e) => {
                    setSelected(e);
                    updateFormData({ tickers: e.map(opt => opt.value) });
                }}
                onCreateOption={handleCreate}
                placeholder="Enter tickers (e.g., AAPL, TSLA)..."
                isDisabled={formData.selectionMode !== "Manual"}
            />

            {/* File upload button (logic not implemented) */}
            <button>upload file</button>
        </>
    );
}

export default TickerInput;
