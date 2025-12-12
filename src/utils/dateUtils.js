/**
 * Get current period value based on period type
 * @param {string} period - Period type ('month', 'quarter', 'year')
 * @returns {string} Current period value in appropriate format
 */
export function getCurrentPeriodValue(period) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  switch (period) {
    case "month":
      return `${year}-${String(month).padStart(2, "0")}`;
    case "quarter": {
      const quarter = Math.ceil(month / 3);
      return `${year}-Q${quarter}`;
    }
    case "year":
      return String(year);
    default:
      return `${year}-${String(month).padStart(2, "0")}`;
  }
}

/**
 * Format month string to readable format
 * @param {string} monthStr - Month in format "YYYY-MM"
 * @returns {string} Formatted month (e.g., "December 2025")
 */
export function formatMonth(monthStr) {
  if (!monthStr) return "";
  const [year, month] = monthStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

/**
 * Format quarter string to readable format
 * @param {string} quarterStr - Quarter in format "YYYY-Q[1-4]"
 * @returns {string} Formatted quarter (e.g., "Q4 2025")
 */
export function formatQuarter(quarterStr) {
  if (!quarterStr) return "";
  const [year, quarter] = quarterStr.split("-");
  return `${quarter} ${year}`;
}

/**
 * Format period value based on period type
 * @param {string} value - Period value
 * @param {string} period - Period type ('month', 'quarter', 'year')
 * @returns {string} Formatted period value
 */
export function formatPeriodValue(value, period) {
  if (!value) return "";

  switch (period) {
    case "month":
      return formatMonth(value);
    case "quarter":
      return formatQuarter(value);
    case "year":
      return value;
    default:
      return value;
  }
}

/**
 * Generate period type options for dropdown
 * @returns {Array} Array of period options
 */
export function generatePeriodOptions() {
  return [
    { value: "month", label: "Monthly" },
    { value: "quarter", label: "Quarterly" },
    { value: "year", label: "Yearly" },
  ];
}

/**
 * Generate value options based on period type
 * @param {string} period - Period type ('month', 'quarter', 'year')
 * @param {number} count - Number of options to generate
 * @returns {Array} Array of value options with value and label
 */
export function generateValueOptions(period, count = 24) {
  const options = [];
  const now = new Date();

  switch (period) {
    case "month": {
      for (let i = 0; i < count; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const value = `${year}-${month}`;

        options.push({
          value,
          label: formatMonth(value),
        });
      }
      break;
    }

    case "quarter": {
      const currentQuarter = Math.ceil((now.getMonth() + 1) / 3);
      let year = now.getFullYear();
      let quarter = currentQuarter;

      for (let i = 0; i < count; i++) {
        const value = `${year}-Q${quarter}`;
        options.push({
          value,
          label: formatQuarter(value),
        });

        quarter--;
        if (quarter < 1) {
          quarter = 4;
          year--;
        }
      }
      break;
    }

    case "year": {
      const currentYear = now.getFullYear();
      for (let i = 0; i < Math.min(count, 10); i++) {
        const year = String(currentYear - i);
        options.push({
          value: year,
          label: year,
        });
      }
      break;
    }

    default:
      break;
  }

  return options;
}
