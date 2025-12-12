import { useMemo } from "react";
import CustomSelect from "./CustomSelect";
import {
  generatePeriodOptions,
  generateValueOptions,
  formatPeriodValue,
  getCurrentPeriodValue,
} from "../../utils/dateUtils";

const DateFilter = ({ period, value, onPeriodChange, onValueChange }) => {
  // Period type options (Monthly, Quarterly, Yearly)
  const periodOptions = useMemo(() => generatePeriodOptions(), []);

  // Value options based on selected period
  const valueOptions = useMemo(
    () => generateValueOptions(period, period === "year" ? 10 : 24),
    [period]
  );

  // Handle period type change
  const handlePeriodChange = (newPeriod) => {
    // When period changes, set value to current period
    const newValue = getCurrentPeriodValue(newPeriod);
    onPeriodChange(newPeriod);
    onValueChange(newValue);
  };

  // Handle value change
  const handleValueChange = (newValue) => {
    onValueChange(newValue);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Period Label */}
      <span className="text-sm text-gray-500 font-medium">Period:</span>

      {/* Period Type Selector */}
      <CustomSelect
        value={period}
        onChange={handlePeriodChange}
        options={periodOptions}
        className="min-w-[120px]"
      />

      {/* Period Value Selector */}
      <CustomSelect
        value={value}
        onChange={handleValueChange}
        options={valueOptions}
        className="min-w-[160px]"
      />
    </div>
  );
};

export default DateFilter;
