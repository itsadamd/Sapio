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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* File Type Column */}
        <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">File Type</h3>
        <div className="space-y-1">
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="outputFormat"
                value="CSV" 
                checked={formData.outputFormat === "CSV"}
                onChange={(e) => updateFormData({ outputFormat: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">CSV</span>
            </label>
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="outputFormat"
                value="XLSX"
                checked={formData.outputFormat === "XLSX"}
                onChange={(e) => updateFormData({ outputFormat: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">XLSX</span>
            </label>
        </div>
        </div>

        {/* Compression Column */}
        <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Compression</h3>
        <div className="space-y-2">
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="compressionType"
                value="Uncompressed"
                checked={formData.compressionType === "Uncompressed"}
                onChange={(e) => updateFormData({ compressionType: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Uncompressed</span>
            </label>
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="compressionType"
                value="zip"
                checked={formData.compressionType === "zip"}
                onChange={(e) => updateFormData({ compressionType: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">.zip</span>
            </label>
        </div>
        </div>

        {/* Date Format Column */}
        <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Date Format</h3>
        <div className="space-y-2">
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="dateFormat"
                value="YYYY-MM-DD"
                checked={formData.dateFormat === "YYYY-MM-DD"}
                onChange={(e) => updateFormData({ dateFormat: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">YYYY-MM-DD</span>
            </label>
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="dateFormat"
                value="DD/MM/YYYY"
                checked={formData.dateFormat === "DD/MM/YYYY"}
                onChange={(e) => updateFormData({ dateFormat: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">DD/MM/YYYY</span>
            </label>
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="dateFormat"
                value="YYYYMMDD"
                checked={formData.dateFormat === "YYYYMMDD"}
                onChange={(e) => updateFormData({ dateFormat: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">YYYYMMDD</span>
            </label>
        </div>
        </div>
    </div>
    </>
    );
}

export default OutputTypeInput;
