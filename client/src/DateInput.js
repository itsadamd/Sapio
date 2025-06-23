import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

/**
 * DateInput - A React component that lets users choose a date range
 * or a fiscal quarter/year range, depending on the selection mode.
 * 
 * - In "Date" mode: Users can pick specific start and end dates.
 * - In "Fiscal" mode: Users can choose fiscal quarters and years for a range.
 * 
 * The component manages form state through the `formData` prop and pushes updates
 * to the parent via the `onChange` callback.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.formData - The current form data object
 * @param {function} props.onChange - Callback to update the form data in the parent component.
 *                                    Called with the updated form object.
 *
 * @returns {JSX.Element} A form with selection mode radio buttons, date pickers,
 *                        and fiscal quarter/year selectors.
 */
function DateInput({ formData, onChange }) {
    
    /**
     * FiscalQuarterInput - Subcomponent that renders dropdowns to select a fiscal year and quarter.
     *
     * Used twice in the main component: once for the start period and once for the end.
     *
     * @param {Object} props
     * @param {boolean} props.disabled - Whether the select inputs should be disabled
     * @param {string|null} props.quarter - Currently selected quarter value (e.g., "Q1")
     * @param {string|null} props.year - Currently selected year value (e.g., "2023")
     * @param {function} props.onQuarterChange - Callback called with new quarter string when changed
     * @param {function} props.onYearChange - Callback called with new year string when changed
     *
     * @returns {JSX.Element} Two dropdowns for fiscal year and quarter selection
     */
    function FiscalQuarterInput({ disabled, quarter, year, onQuarterChange, onYearChange }) {
        const quarterOptions = [
            { value: 'Q1', label: 'Q1' },
            { value: 'Q2', label: 'Q2' },
            { value: 'Q3', label: 'Q3' },
            { value: 'Q4', label: 'Q4' }
        ];

        const yearOptions = [];
        for (let y = 2009; y <= new Date().getFullYear(); y++) {
            yearOptions.push({ value: y.toString(), label: y.toString() });
        }

        const selectedQuarter = quarterOptions.find(opt => opt.value === quarter) || null;
        const selectedYear = yearOptions.find(opt => opt.value === year) || null;

        return (
            <>
                <Select
                    isDisabled={disabled}
                    options={yearOptions}
                    value={selectedYear}
                    onChange={opt => onYearChange(opt.value)}
                />
                <Select
                    isDisabled={disabled}
                    options={quarterOptions}
                    value={selectedQuarter}
                    onChange={opt => onQuarterChange(opt.value)}
                />
            </>
        );
    }

    /**
     * updateFormData - Utility to merge new values into the existing formData
     * and notify the parent component.
     *
     * @param {Object} newValues - Partial form data to merge
     */
    function updateFormData(newValues) {
        onChange({ ...formData, ...newValues });
    }

    return (
        <>
            {/* Mode toggle */}
            <div>
                <label>
                    <input
                        type="radio"
                        value="Fiscal"
                        checked={formData.selectionMode === "Fiscal"}
                        onChange={(e) => updateFormData({ selectionMode: e.target.value })}
                    />
                    Fiscal
                </label>
                <label>
                    <input 
                        type="radio"
                        value="Date"
                        checked={formData.selectionMode === "Date"}
                        onChange={(e) => updateFormData({ selectionMode: e.target.value })}
                    />
                    Date
                </label>
            </div>

            {/* Date pickers (visible in Date mode) */}
            <p>Start Date:</p>
            <DatePicker
                selected={formData.startDate}
                onChange={(date) => updateFormData({ startDate: date })}
                placeholderText="Enter Start Date"
                disabled={formData.selectionMode !== "Date"}
            />
            <p>End Date:</p>
            <DatePicker 
                selected={formData.endDate}
                onChange={(date) => updateFormData({ endDate: date })}
                placeholderText="Enter End Date"
                disabled={formData.selectionMode !== "Date"}
            />

            {/* Fiscal inputs (visible in Fiscal mode) */}
            <p>Start Quarter:</p>
            <FiscalQuarterInput
                disabled={formData.selectionMode !== "Fiscal"}
                quarter={formData.startFiscalQuarter}
                year={formData.startFiscalYear}
                onQuarterChange={(val) => updateFormData({ startFiscalQuarter: val })}
                onYearChange={(val) => updateFormData({ startFiscalYear: val })}
            />
            <p>End Quarter:</p>
            <FiscalQuarterInput
                disabled={formData.selectionMode !== "Fiscal"}
                quarter={formData.endFiscalQuarter}
                year={formData.endFiscalYear}
                onQuarterChange={(val) => updateFormData({ endFiscalQuarter: val })}
                onYearChange={(val) => updateFormData({ endFiscalYear: val })}
            />
        </>
    );
}

export default DateInput;
