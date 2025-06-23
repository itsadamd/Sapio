import React from 'react';

/**
 * OutputTypeInput - A React component that allows users to configure
 * output file settings through a set of radio button groups.
 *
 * The component supports user selection for:
 * - File format: "CSV" or "XLSX"
 * - Compression: "Uncompressed" or "ZIP"
 * - Date format: "YYYY-MM-DD", "DD/MM/YYYY", or "YYYYMMDD"
 *
 * It does not maintain its own internal state; instead, it updates the
 * `formData` object provided by the parent component via the `onChange` callback.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form state, expected shape:
 *   {
 *     outputFormat: "CSV" | "XLSX",
 *     compressionType: "Uncompressed" | "ZIP",
 *     dateFormat: "YYYY-MM-DD" | "DD/MM/YYYY" | "YYYYMMDD"
 *   }
 * @param {function} props.onChange - Callback function invoked when the form state changes.
 *                                    Called with the full updated `formData` object.
 *
 * @returns {JSX.Element} Radio button groups for selecting file type, compression type, and date format.
 */
function OutputTypeInput({ formData, onChange }) {

    /**
     * Merges new values into the existing formData and triggers onChange callback.
     *
     * @param {Object} newValues - Partial form data with key-value pairs to update.
     */
    function updateFormData(newValues) {
        onChange({ ...formData, ...newValues });
    }

    return (
        <>
            {/* File format selection */}
            <h4>File Type: </h4>
            <div>
                <label>
                    <input
                        type="radio"
                        value="CSV"
                        checked={formData.outputFormat === "CSV"}
                        onChange={(e) => updateFormData({ outputFormat: e.target.value })}
                    />
                    CSV
                </label>
                <label>
                    <input 
                        type="radio"
                        value="XLSX"
                        checked={formData.outputFormat === "XLSX"}
                        onChange={(e) => updateFormData({ outputFormat: e.target.value })}
                    />
                    XLSX
                </label>
            </div>

            {/* Compression type selection */}
            <h4>Compression: </h4>
            <div>
                <label>
                    <input
                        type="radio"
                        value="Uncompressed"
                        checked={formData.compressionType === "Uncompressed"}
                        onChange={(e) => updateFormData({ compressionType: e.target.value })}
                    />
                    Uncompressed
                </label>
                <label>
                    <input 
                        type="radio"
                        value="ZIP"
                        checked={formData.compressionType === "ZIP"}
                        onChange={(e) => updateFormData({ compressionType: e.target.value })}
                    />
                    .zip
                </label>
            </div>

            {/* Date format selection */}
            <h4>Date Format: </h4>
            <div>
                <label>
                    <input
                        type="radio"
                        value="YYYY-MM-DD"
                        checked={formData.dateFormat === "YYYY-MM-DD"}
                        onChange={(e) => updateFormData({ dateFormat: e.target.value })}
                    />
                    YYYY-MM-DD
                </label>
                <label>
                    <input 
                        type="radio"
                        value="DD/MM/YYYY"
                        checked={formData.dateFormat === "DD/MM/YYYY"}
                        onChange={(e) => updateFormData({ dateFormat: e.target.value })}
                    />
                    DD/MM/YYYY
                </label>
                <label>
                    <input 
                        type="radio"
                        value="YYYYMMDD"
                        checked={formData.dateFormat === "YYYYMMDD"}
                        onChange={(e) => updateFormData({ dateFormat: e.target.value })}
                    />
                    YYYYMMDD
                </label>
            </div>
        </>
    );
}

export default OutputTypeInput;
